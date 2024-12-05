# Imagem para site

# FROM node:lts-bookworm AS dependencies
# WORKDIR /app
# RUN git clone https://github.com/RunGuard/Main.git
# WORKDIR /app/Main/SITE/API-LIMPA/web-data-viz/
# RUN npm install
# 
# EXPOSE 3333
# CMD [ "npm","start" ]

FROM node:lts-bookworm AS dependencies
WORKDIR /
COPY ./SITE/API-LIMPA/web-data-viz/package.json .
RUN npm install

FROM node:lts-alpine3.20 AS deploy
WORKDIR /
COPY --from=dependencies ./node_modules ./node_modules
COPY ./SITE/API-LIMPA/web-data-viz .
EXPOSE 80
CMD ["node", "app.js"]