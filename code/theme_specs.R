#Theming
#colors/theme
bay_palette <- function(num_values) {
  bay_colors <- c(indigo = "#00496F",
                  teal = "#0F85A0",
                  green = "#6B9555",
                  citron = "#ACB64E",
                  yellow = "#edd746",
                  orange = "#E58C35",
                  flame = "#E1672D",
                  red = "#BD3922",
                  maroon = "#903B3D",
                  orchid = "#623D57")
  color_order <- c("teal", "red","green", "flame",  "orchid","indigo", "yellow", "maroon", "citron", "orange")
  num_colors <- length(color_order)
  if (num_values < num_colors) {
    unname(bay_colors[Filter(
      function(color) color %in% color_order[1:num_values],
      names(bay_colors)
    )])
  } else {
    color_indeces <- 0:(num_values - 1) %% num_colors
    unname(bay_colors[color_indeces + 1])
  }
}

scale_colour_bay <- function(...) {
  ggplot2::discrete_scale("colour", "bay", bay_palette, ...)
}

scale_color_bay <- function(...) {
  scale_colour_bay(...)
}

scale_fill_bay <- function(...) {
  ggplot2::discrete_scale("fill", "bay", bay_palette, ...)
}

theme_jmank <- function (base_size = 11, base_family = "Roboto", base_line_size = base_size/22, 
                         base_rect_size = base_size/22) 
{
  theme_classic(base_size = base_size, base_family = base_family, 
                base_line_size = base_line_size, base_rect_size = base_rect_size) %+replace% 
    theme(panel.border = element_blank(), panel.grid.major = element_blank(), 
          panel.grid.minor = element_blank(), axis.line = element_line(colour = "black", 
                                                                       size = rel(1)), legend.key = element_blank(), 
          strip.background = element_rect(fill = "white", colour = "black", 
                                          size = rel(2)), complete = TRUE) + 
    theme(plot.title = element_text(face = "bold"))
}