WORKDIR=$(shell pwd)

up:
	docker-compose up crypto-dashboard-ui

npm-install:
	docker-compose exec crypto-dashboard-ui npm i ${PACKAGE}

autoformat-webtool:
	docker-compose run --rm crypto-dashboard-ui npm run autoformat

build: build-app

build-app:
	docker-compose build crypto-dashboard-ui
