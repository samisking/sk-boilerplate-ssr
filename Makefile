# Bootstrap your local environment.
bootstrap:
	yarn install
	yarn run build
	make build

.PHONY:build

# Builds docker image
build:
	docker-compose build

runserver:
	DOCKER_IP=$(shell docker-machine ip) docker-compose up

clean:
	yarn run clean

lint:
	yarn run lint

install-yarn:
	curl -o- -L https://yarnpkg.com/install.sh | bash -s
