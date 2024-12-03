#WORD CLOUD

#INSTALANDO BIBLIOTECAS
install.packages("tm")
install.packages("wordcloud")
install.packages("RColorBrewer")
install.packages("readr")

#UTILIZANDO AS BIBLIOTECAS
library(tm)
library(wordcloud)
library(RColorBrewer)
library(readr)

dadosconsumidos <- read_csv("tasks3.csv")
View(dadosconsumidor2023)


corpo = Corpus(VectorSource(dadosconsumidos))

#tratamento das palavras
corpo = tm_map(corpo, removePunctuation)
corpo = tm_map(corpo, removeNumbers)
corpo = tm_map(corpo, removeMethod)


tdm <- TermDocumentMatrix(corpo)
m <- as.matrix(tdm)


#Calcula a frequencia das palavras e ordena a matrix
frequencia_palavras <- sort(rowSums(m), 
                            decreasing = TRUE)

frequencia_palavras_df <- data.frame(word = names(frequencia_palavras), 
                                     freq = frequencia_palavras)

head(frequencia_palavras_df, 1)

wordcloud(words = frequencia_palavras_df$word, 
          freq = frequencia_palavras_df$freq, 
          min.freq = 0, 
          max.words = 200, 
          random.order = FALSE, 
          rot.per = 0.2, 
          scale = c(5, 0), 
          colors = brewer.pal(10, "Dark2")
)
