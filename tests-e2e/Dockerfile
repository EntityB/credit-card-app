FROM node:18-slim

WORKDIR /usr/src/e2e

COPY package*.json ./

RUN npm ci

COPY . ./

CMD [ "npm", "test" ]