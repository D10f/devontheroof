start:
	docker compose up -d && \
	node_modules/.bin/wp-scripts start;

build:
	node_modules/.bin/wp-scripts build && \
	tar -cvjf devontheroof.tar.bz2 \
	assets \
	build \
	inc \
	templates \
	*.css \
	*.php \
	*.png;

restore-wp:
	docker compose down && \
	docker run --rm -i \
		--mount type=bind,src=/home/${USER}/Backups/devontheroof/devontheroof_data_2023-01-14.tar.bz2,dst=/app/data.tar.bz2 \
		--mount type=volume,src=devontheroof_wp_data,dst=/var/www/html,readonly=false \
		wordpress:php8.2-fpm \
		bash -c 'rm -rf /var/www/html/* && tar -xf /app/data.tar.bz2 -C /var/www/html'

restore-db:
	docker compose up -d && \
	gunzip < /home/${USER}/Backups/devontheroof/devontheroof_db_2023-01-14.sql.gz | \
		docker exec -i devontheroof-db-1 sh -c 'exec mysql -u wordpress -pwordpress wordpress' && \
	docker exec -i devontheroof-wordpress-1 sh -c '\
		curl -O https://raw.githubusercontent.com/wp-cli/builds/gh-pages/phar/wp-cli.phar && \
		chmod +x wp-cli.phar && \
		mv wp-cli.phar /usr/local/bin/wp && \
		wp search-replace https://devontheroof.top http://devontheroof.local --allow-root'
