start:
	docker-compose up -d && \
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