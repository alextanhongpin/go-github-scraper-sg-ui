-include .env
export

VUE_APP_GIT_VERSION := $(shell git rev-parse --short HEAD) 
# VUE_APP_API_URI := http://localhost:3000
VUE_APP_API_URI := https://github-recommender.ap-southeast-1.elasticbeanstalk.com

start:
	@yarn serve

build:
	@yarn build

deploy: build
	@yarn run deploy

gh-pages: create-config build
	@yarn run gh-pages
	@rm vue.config.js

create-config:
	@echo 'module.exports = { "publicPath": "/go-github-scraper-sg-ui/" }' > vue.config.js
