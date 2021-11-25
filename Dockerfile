FROM wordpress:php7.4-fpm as app

COPY src/wp_theme /var/www/html/wp-content/themes/

HEALTHCHECK --interval=30s --timeout=30s --retries=10 --start-period=120s \
  CMD [ "php-fpm", "--test" ]

CMD ["php-fpm"]