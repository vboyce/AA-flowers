# One time script for preprocessing the RL agent model results

library(tidyverse)
library(here)
library(stringr)

d.rl_data.raw <- read_csv(here("data/raw_data/RL_experiment_results_raw.csv"), skip=1)

d.rl_data <- d.rl_data.raw %>% 
  select(everything(), -contains("overall")) %>%
  pivot_longer(cols = -any_of("Name"), names_to = "measure") %>%
  #replace "overall" with something with an understore so I can string split
  #string split everything into a list? 
  mutate(agent = substr(measure, str_length("train_")+1, str_length("train_agent_1")),
         measure = substr(measure, 
                              str_length("train_agent_1")+2, 
                              str_length(measure))) %>%
  separate(Name, into = c("condition", "languageCondition", "trial"), sep = "_") %>%
  pivot_wider(names_from = "measure", values_from = "value") %>%
  mutate(condition_raw = condition, 
         condition = ifelse(condition_raw == "joint", "Shared Utilities", "Individual Utilities"),
         languageConditionRaw = languageCondition,
         languageCondition =ifelse(languageConditionRaw == "contcomm", "Lang", "Nonlang"),
         rl_agent = TRUE) %>%
  write_csv(here("data/processed_data/RL_experiment_results.csv"))

