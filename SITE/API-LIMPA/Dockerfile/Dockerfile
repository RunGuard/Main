FROM node:latest AS dependencies
WORKDIR /
COPY ./SITE/API-LIMPA/web-data-viz/package.json
RUN npm install
EXPOSE 3333
CMD [ "node","app.js" ]
