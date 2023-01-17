start:
	docker compose up -d nginx;

build:
	docker compose run --rm npm npm run build && \
	tar -cvjf devontheroof.tar.bz2 \
	assets \
	build \
	inc \
	templates \
	*.css \
	*.php \
	*.png;

restore-wp:
	docker run --rm -i \
		--mount type=bind,src=/home/${USER}/Backups/devontheroof/devontheroof_data_2023-01-14.tar.bz2,dst=/app/data.tar.bz2 \
		--mount type=volume,src=devontheroof_wp_data,dst=/var/www/html,readonly=false \
		wordpress:php8.2-fpm \
		bash -c 'rm -rf /var/www/html/* && tar -xf /app/data.tar.bz2 -C /var/www/html'

restore-db:
	docker compose start db && \
	sleep 10 && \
	gunzip < /home/${USER}/Backups/devontheroof/devontheroof_db_2023-01-14.sql.gz | \
		docker exec -i devontheroof-db-1 sh -c 'exec mysql -u wordpress -pwordpress wordpress'

restore-domain:
	docker compose run --rm wp search-replace https://devontheroof.top http://devontheroof.local

restore:
	docker compose up --no-start && \
	make restore-wp && \
	make restore-db && \
	make restore-domain && \
	docker compose down
