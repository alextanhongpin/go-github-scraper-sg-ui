-include .env
export

VUE_APP_GIT_VERSION := $(shell git rev-parse --short HEAD) 
# VUE_APP_API_URI := http://localhost:3000
VUE_APP_API_URI := http://github-recommender.ap-southeast-1.elasticbeanstalk.com

start:
	@yarn serve

build:
	@npm run build

deploy: build
	@npm run deploy

gh-pages: build
	@npm run gh-pages
