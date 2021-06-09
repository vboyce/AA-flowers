library(ggplot2)
library(dplyr)
library(langcog)
library(readr)
library(tidyr)
library(stringr)
library(magrittr)
library(directlabels)
library(lubridate)
library(lme4)
library(rstan)
library(purrr)

rstan_options(auto_write = TRUE)
options(mc.cores = parallel::detectCores())

result_files <- "data/pilot0/output.csv"
#result_files <-  list.files(path = "../data/pilot0/",recursive = TRUE,
 #                           all.files = FALSE, full.names = TRUE,
  #                          pattern = "output.csv")

setup_alignment_data <- function(corpus_df) {
  corpus_df %>%
    group_by(category, subpop) %>%
    summarise_each(funs(sum), ba, nba, bna, nbna) %>%
    filter(ba + bna > 1) %>%
    ungroup() %>%
    mutate(category_num = as.numeric(as.factor(category)),
           subpop_num = as.numeric(as.factor(subpop))) 
}


childes_data <- lapply(result_files, read_csv) %>%
  bind_rows() %>%
  rename(Speaker = speakerId, Replier = replierId) %>%
  mutate(subpop = paste(Speaker,  "-", Replier)) %>%
  filter(Speaker != Replier) 

childes_data <- childes_data %>%
  setup_alignment_data()

fit_alignment <- function(alignment_df, sd = .5) {
  
alignment_data <- list(NumMarkers = length(unique(alignment_df$category)),
                         NumSubPops = length(unique(alignment_df$pop_)),
                         NumObservations = nrow(alignment_df),
                         SpeakerSubPop = alignment_df$subpop_num,
                         MarkerType = alignment_df$category_num,
                         NumUtterancesAB = alignment_df$ba + alignment_df$nba,
                         NumUtterancesNotAB = alignment_df$bna+alignment_df$nbna,
                         CountsAB = alignment_df$ba,
                         CountsNotAB = alignment_df$bna,
                         StdDev=sd )


fit_model <- sampling(alignment_model, data = alignment_data, 
                      iter = 500, warmup = 100, chains = 3 ,
                      control = list(adapt_delta = .95))

return(fit_model) 
}


alignment_model = stan_model(file = "~/Documents/stanmodel.stan")

alignment_data <- fit_alignment(childes_data) 


