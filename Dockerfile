#
# Development stage
##

FROM node:16-buster-slim AS development

WORKDIR /app

ENV PATH=/app/node_modules/.bin:$PATH

EXPOSE 8080

COPY package*.json ./

RUN npm install

CMD ["webpack", "serve"]


#
# Build stage
##

FROM development AS build

COPY . .

# Update functions.php with webpack-generated js and css files
RUN npm run build && \
  MAIN_CSS=$(ls ./dist/main.*.css | cut -d "/" -f2) && \
  sed -i "s/main.*.css/${MAIN_CSS}/i" src/wp-theme/functions.php && \
  MAIN_JS=$(ls ./dist/main.*.js | cut -d "/" -f2) && \
  sed -i "s/main.*.js/${MAIN_JS}/i" src/wp-theme/functions.php && \
  cp -r src/wp-theme/* dist/ && \
  cp assets/publickey.devsojourn@pm.me.asc dist/ && \
  rm dist/*.html dist/*.txt

# Build wp custom block
RUN cd src/wp-plugins/prism && \
    npm install && \
    npm run build


#
# Production stage
##

FROM wordpress:php7.4-fpm AS production

WORKDIR /var/www/html/wp-content

COPY --from=build /app/dist/ ./themes/my_theme/
COPY --from=build /app/src/wp-plugins/prism/ ./plugins/prism/

RUN chown -R www-data:www-data /var/www
