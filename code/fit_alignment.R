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
                         NumSubPops = length(unique(alignment_df$subpop)),
                         NumObservations = nrow(alignment_df),
                         SpeakerSubPop = alignment_df$subpop_num,
                         MarkerType = alignment_df$category_num,
                         NumUtterancesAB = alignment_df$ba + alignment_df$nba,
                         NumUtterancesNotAB = alignment_df$bna+alignment_df$nbna,
                         CountsAB = alignment_df$ba,
                         CountsNotAB = alignment_df$bna,
                         StdDev=sd )

return(alignment_data) 
}

alignment_data <- fit_alignment(childes_data) 


alignment_model = stan_model(file = "~/Documents/stanmodel.stan")

fit<- sampling(alignment_model, data = alignment_data, 
                iter = 500, warmup = 100, chains = 3 ,
                control = list(adapt_delta = .95))

#fit <- stan(file = alignment_model, data = alignment_data, 
 #           iter = 500, chains =1 )

mu_notab <- colMeans(rstan:::extract(fit,"mu_notab")$mu_notab)
mu_ab <- colMeans(rstan:::extract(fit,"mu_ab")$mu_ab)

d2<- childes_data
#If the model works, its mu_ values should be "smoothed" estimates of p(B|A) & p(B|notA)
par(mar = rep(2, 4))
plot(mu_ab,d2$ba/(d2$ba+d2$nba))
plot(mu_notab,d2$bna/(d2$bna+d2$nbna))

#checking in on the learned subpopulation values
eta_ab_subpop <- colMeans(rstan:::extract(fit,"eta_ab_subpop")$eta_ab_subpop)
eta_subpop <- colMeans(rstan:::extract(fit,"eta_subpop")$eta_subpop) ######this doesn't exist

d3 <- d2 %>%
  mutate(model_eta = colMeans(rstan:::extract(fit,"eta_ab_observation")$eta_ab_observation))

d3$model_mu <- log(colMeans(rstan:::extract(fit,"mu_ab")$mu_ab)) - 
  log(colMeans(rstan:::extract(fit,"mu_notab")$mu_notab))

d3$model_dnm <- colMeans(rstan:::extract(fit,"mu_ab")$mu_ab) - 
  colMeans(rstan:::extract(fit,"mu_notab")$mu_notab)


d4 <- d3 %>%
  group_by(subpop) %>%
  multi_boot_standard("model_eta", na.rm = F)

ggplot(aes(x = mean, y = subpop), data = d4) +
  geom_pointrange(aes(xmax = ci_upper, xmin = ci_lower)) +
  geom_smooth(method = "loess") +
  scale_color_brewer(palette = "Set1") +
  theme_bw(base_size = 14) +
  theme(panel.grid = element_blank())

d4 <- d3 %>%
  group_by(subpop, category) 

#This is the plot for results/children_eta_bywords.pdf
ggplot(aes(y = subpop, x = model_eta, colour = category,
), data=d4) + 
  geom_point()+
  geom_smooth(method = "loess") +
  scale_color_brewer(palette = "Set1") +
  theme_bw(base_size = 14) +
  theme(panel.grid = element_blank()) +
  labs(title='Model-estimated Alignment to speaker pairs',
       y='Speaker pairs',
       x='Alignment (delta log-odds)',
       colour='Alignment')





