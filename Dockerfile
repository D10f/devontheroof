#
# Development stage
##

FROM node:16-buster-slim AS development

WORKDIR /app

ENV PATH=/app/node_modules/.bin:$PATH

EXPOSE 8080

COPY package*.json ./

RUN npm install

USER node

CMD ["webpack", "serve"]
