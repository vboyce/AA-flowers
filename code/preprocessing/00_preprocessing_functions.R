# Preprocessing functions for analyzing the adaptive agents pilots

#These functions cover reading in the raw data, converting to tidy formats, filtering out unfinished rounds, and writing tidy processed csvs.

# Libraries
library(tidyverse)
library(jsonlite)
library(here)

# helper functions
ParseJSONColumn <- function(x) {
  str_c("[ ", str_c(x, collapse = ",", sep=" "), " ]")  %>% 
    fromJSON(flatten = T)
}

extract_context_info <- function(context_key){
  return(str_extract(context_key, "[^.]*$"))
}

get_player_data <- function(data_read_location, date_start) {
  d.players <- read_csv(here(data_read_location, 'players.csv'), 
                        col_types = cols(data.timeClick = col_number())) %>%
    rename(playerId = `_id`) %>% 
    filter(createdAt >= date_start) %>%
    rename_with(~ gsub("data.", "", .x, fixed = TRUE))
  return(d.players)
}

get_game_data <- function(data_read_location, date_start, players_data) {
  # gets the game information, factors, and treatment variables for each game
  d.games.raw <- read_csv(here(data_read_location, 'games.csv')) %>% 
    rename(gameId = `_id`) %>% 
    filter(createdAt >= date_start) %>%
    rename_with(~ gsub("data.", "", .x, fixed = TRUE))
  
  d.treatments.raw <- read_csv(here(data_read_location, 'treatments.csv')) %>% 
    rename(treatmentId = `_id`) %>%
    mutate(factorIds = str_split(factorIds, pattern=",")) %>%
    unnest(factorIds) %>% rename(factorId = factorIds)
  
  d.factors.raw <- read_csv(here(data_read_location, 'factors.csv'))%>% 
    rename(factorId = `_id`)
  
  d.factor_types.raw <- read_csv(here(data_read_location, 'factor-types.csv')) %>%
    rename(factorTypeId = "_id",
           factorName = "name")
  
  d.factors <- d.factors.raw %>% 
    left_join(d.factor_types.raw %>% 
                select(factorTypeId, factorName))
  
  d.treatments <- d.treatments.raw %>% 
    left_join(d.factors %>% 
                select(factorId, factorName, value)) %>%
    pivot_wider(id_cols = c(treatmentId, name, createdAt), 
                names_from = factorName, values_from = value)
  
  d.games <- d.games.raw %>% 
    #add treatment variables
    left_join(d.treatments %>% 
                select(-createdAt)) %>%
    janitor::remove_empty() %>%
    #select out the nonuseful columns
    select(-c(gameLobbyId, treatmentId, batchId, targetSet, 
              justStarted, submitCode, roundIds)) %>%
    #separate out player info
    separate(col = playerIds, sep = ",", into = c("player_1", "player_2", "player_3")) %>% 
    pivot_longer(cols = starts_with("player_"), 
                 names_to = "playerNum", 
                 values_to = "playerId") %>%
    left_join(players_data %>% select(playerId, readyAt)) %>%
    #calculate game time
    mutate(game_length = finishedAt - readyAt) %>%
    group_by(across(gameId:chatEnabled)) %>%
    summarize(gameLength = max(game_length)) %>% ungroup()
  return(d.games)
}

get_round_data <- function(data_read_location, date_start) {
  d.round_results.raw <- read_csv(here(data_read_location,'rounds.csv'), guess_max=10000) %>% 
    filter(createdAt >= date_start) %>% 
    rename_with(~ gsub("data.", "", .x, fixed = TRUE)) %>% 
    rename_with ( ~ gsub("room", "player", .x, fixed=T))
  
  d.round_results <- d.round_results.raw  %>% 
    #filter out rounds where no one made a selection
    filter(!is.na(chat)) %>%
    select(-chat, -context) %>%
    mutate_at(vars(starts_with('player')), as.character) %>%
    pivot_longer(cols = starts_with('player'), 
                 names_to = c('blah', 'playerId', 'info'), 
                 values_to = "value",
                 names_sep = "_",
                 values_drop_na = TRUE) %>%
    pivot_wider(names_from = "info", values_from = "value") %>%
    select(-blah) %>%
    mutate_at(c("time", "utility"), as.numeric) %>%
    #if a participant didn't make a choice, their earned utility should be 0
    mutate(utility = ifelse(response == "false", 0, utility)) %>%
    #TODO: some times are negative?? interesting
    mutate(time = abs(as.numeric(time)/1000)) %>%
    rename(time_sec = time, playerResponse = response, playerUtility = utility) %>%
    arrange(createdAt, gameId, blockNum, repNum)
  return(d.round_results)
}

get_raw_chat <- function(data_read_location, date_start) {
  d.chat.raw <-  read_csv(here(data_read_location,'rounds.csv'), guess_max=10000) %>% 
    filter(createdAt >= date_start) %>% 
    rename_with(~ gsub("data.", "", .x, fixed = TRUE)) %>% 
    rename_with ( ~ gsub("room", "player", .x, fixed=T)) %>%
    filter(createdAt >= date_start) %>%
    #there will always be an alert for each active round, so drop NA
    filter(!is.na(chat)) %>%
    select(-c(ends_with('response'), 
              ends_with('time'), 
              ends_with('utility'), 
              context, stageIds)) %>%
    #mutate(chat = ifelse(is.na(chat), '{}', chat)) %>%
    rename(roundID = `_id`) %>%
    mutate(chat = map(chat, .f = ParseJSONColumn)) %>%
    unnest(chat)
  return(d.chat.raw)
}

add_chat_info <- function(raw_chat_data, player_data, round_data, game_data) {
  chat.info <- raw_chat_data %>%
    arrange(createdAt, gameId, blockNum, repNum) %>% 
    left_join(player_data %>% select(playerId, name)) %>%
    left_join(round_data %>% select(gameId, blockNum, repNum, trialNum, playerId, playerResponse, playerUtility)) %>%
    left_join(game_data %>% select(gameId, condition, chatEnabled)) %>%
    mutate("participantAction" = ifelse(type == "alert", 
                                        paste(name, "selected", 
                                              playerResponse, "for", 
                                              playerUtility, "point(s)"), 
                                        NA)) %>%
    select(gameId, trialNum, condition, chatEnabled, 
           playerId, name, text, participantAction, everything())
  return(chat.info)
}

preprocess_dataset <- function(data_name, date_start = lubridate::ymd('2021-01-01')) {
  data_read_location = here("data/raw_data", data_name)
  data_write_location = here("data/processed_data", data_name)
  
  d.players <- get_player_data(data_read_location, date_start)
  d.games <- get_game_data(data_read_location, date_start, d.players)
  d.rounds <- get_round_data(data_read_location, date_start)
  d.raw_chat <- get_raw_chat(data_read_location, date_start) %>%
    add_chat_info(d.players, d.rounds, d.games)
  
  d.players %>% write_csv(here(data_write_location, "players.csv"))
  d.games %>% write_csv(here(data_write_location, "games.csv"))
  d.rounds %>% write_csv(here(data_write_location, "rounds.csv"))
  d.raw_chat %>% write_csv(here(data_write_location, "raw_chat.csv"))
  
  return(paste0("Processed ", data_name))
}

process_all_data <- function(dataset_list) {
  return(invisible(mapply(preprocess_dataset, dataset_list)))
}

do_join_data <- function(csv_name){
  joined_csv <- list.files(path=here("data/processed_data"), 
                        pattern=glue::glue("{csv_name}.csv$"), recursive = T) %>% 
    map_df(~read_csv(here("data/processed_data", .))) %>% 
      write_csv(here(glue::glue("data/processed_data/joined_data/{csv_name}.csv")))
  return(glue::glue("Processed {csv_name}"))
}

join_all_data <- function() {
 lapply(c("players", "games", "rounds", "raw_chat"), do_join_data)
}

