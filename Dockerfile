FROM node:16-buster-slim

WORKDIR /app

EXPOSE 8080

COPY package*.json ./

RUN npm install

CMD ["npm", "start"]