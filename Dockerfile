FROM node:16-buster-slim

WORKDIR /app

ENV PATH=/app/node_modules/.bin:$PATH

EXPOSE 8080

COPY package*.json ./

RUN npm install

CMD ["webpack", "serve"]