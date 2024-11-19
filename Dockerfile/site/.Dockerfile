FROM node:latest
WORKDIR /app
RUN git clone https://github.com/RunGuard/Main.git
WORKDIR /app/Main/SITE/API-LIMPA/web-data-viz
RUN npm install

EXPOSE 3333
CMD ["npm","start"]