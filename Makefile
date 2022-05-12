DOCKER_COMPOSE_FILE := docker-compose.yml
ALLURE_SERVER_IMAGE := registry.itv.restr.im:5000/itv-site/web-base/allure-server

.PHONY: build
build:
	docker build --no-cache --pull --tag "$(ALLURE_SERVER_IMAGE)" .

.PHONY: update
update:
	docker build --no-cache --pull --tag "$(ALLURE_SERVER_IMAGE)" .
	docker push "$(ALLURE_SERVER_IMAGE)"

.PHONY: run
run:
	docker run --rm -it \
	-v /Users/ramisvakazov/allure-server/uploads:/apps/allure-server/uploads \
	-v /Users/ramisvakazov/allure-server/allure-report:/apps/allure-server/allure-reports \
	-v /Users/ramisvakazov/allure-server/db:/apps/allure-server/db \
	-p 5005:5005 -p 127.0.0.1:8080:8080 -e NODE_ENV=production rvakazov/allure-server:latest
	$(ALLURE_SERVER_IMAGE)

.PHONY: run-on-server
run-on-server:
	docker run -it --network=host \
	-v /root/allure-server/uploads:/apps/allure-server/uploads \
	-v /root/allure-server/allure-report:/apps/allure-server/allure-reports \
	-v /root/allure-server/db:/apps/allure-server/db \
	-p 5005:5005 --privileged -e NODE_ENV=production registry.itv.restr.im:5000/itv-site/web-base/allure-server

.PHONY: delete-images
delete-images:
	docker rmi -f $(docker images | grep "^<none>" | awk "{print $3}")

