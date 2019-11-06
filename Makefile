-include .env
export

VUE_APP_GIT_VERSION := $(git rev-parse --short HEAD) 
VUE_APP_API_URI := http://localhost:3000

start:
	@yarn serve
