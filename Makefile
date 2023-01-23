# CREDIT:
# https://github.com/emad-zaamout

# Makes sure that targets are not treated as physical files
.PHONY: archive build restore restore-db restore-domain restore-wp start stop

BACKUP_DIR=/home/${USER}/Backups/devontheroof
DB_BACKUP_FILE=devontheroof_db_2023-01-14.sql.gz
WP_BACKUP_FILE=devontheroof_data_2023-01-14.tar.bz2

print-help: help

archive: ## Creates an archive with bundled theme files ready for production
	tar -cvjf devontheroof.tar.bz2 \
	assets \
	build \
	inc \
	templates \
	*.css \
	*.php \
	*.png;

build: ## Builds frontend assets
	docker compose run --rm npm run build;

help: ## Print this menu
	@awk 'BEGIN {FS = ":.*##"; printf "\nUsage:\n  make \033[36m<target>\033[0m\n\nTargets:\n"} /^[a-zA-Z_-]+:.*?##/ { printf "  \033[36m%-15s\033[0m %s\n", $$1, $$2 }' $(MAKEFILE_LIST);

logs: ## Print logs for all running services
	@docker compose logs -f

ps: ## Show status for all running containers
	@docker compose ps;

restore: ## Restores a WordPress site from backup files stores in ${BACKUP_DIR}
	docker compose up --no-start && \
	make restore-wp && \
	make restore-db && \
	make restore-domain && \
	docker compose down

restore-db: ## Restores the database only
	docker compose start db && \
	sleep 10 && \
	gunzip < ${BACKUP_DIR}/${DB_DATA_FILE} | \
		docker exec -i devontheroof-db-1 sh -c 'exec mysql -u wordpress -pwordpress wordpress'

restore-domain: ## Replaces url references of https:// with http:// 
	docker compose run --rm wp search-replace https://devontheroof.top http://devontheroof.local

restore-wp: ## Restores WordPress files only
	docker run --rm -i \
		--mount type=bind,src=${BACKUP_DIR}/${WP_DATA_FILE},dst=/app/data.tar.bz2 \
		--mount type=volume,src=devontheroof_wp_data,dst=/var/www/html,readonly=false \
		wordpress:php8.2-fpm \
		bash -c 'rm -rf /var/www/html/* && tar -xf /app/data.tar.bz2 -C /var/www/html'

start: ## Starts the development server
	docker compose up -d nginx;

stop: ## Stops the development server
	docker compose down;

