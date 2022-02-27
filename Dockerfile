#
# Development image
##

FROM node:16-buster-slim AS development

WORKDIR /app

ENV PATH=/app/node_modules/.bin:$PATH

EXPOSE 8080

COPY package*.json ./

RUN npm install

CMD ["webpack", "serve"]

#
# Production image
##

FROM wordpress:php7.4-fpm AS production

WORKDIR /var/www/html/wp-content

# Copy theme over to themes directory
COPY dist/ ./themes/my_theme/

# Copy custom WP Block over to plugins
COPY src/wp-plugins/prism/index.php ./plugins/prism
COPY src/wp-plugins/prism/src/index.js ./plugins/prism
COPY src/wp-plugins/prism/build ./plugins/prism

