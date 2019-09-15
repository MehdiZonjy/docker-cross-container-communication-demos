FROM node:12.10.0-alpine


RUN mkdir /app
WORKDIR /app

COPY . .
RUN npm install

ENTRYPOINT [ "node", "app.js" ]