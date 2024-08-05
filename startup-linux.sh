#! /bin/bash
git pull
sudo docker stop docker-backend
sudo docker stop FileBrowser
sudo docker stop pgAdmin
sudo docker stop webcenter-front

sudo docker container rm docker-backend
sudo docker container rm FileBrowser
sudo docker container rm --volumes pgAdmin
sudo docker container rm --volumes webcenter-front

sudo docker image rm home_webcenter-docker-backend:latest
sudo docker image rm home_webcenter-front:latest

cd docker && sudo docker compose up --detach