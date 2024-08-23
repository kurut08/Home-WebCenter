#! /bin/bash
git pull
sudo docker stop docker-backend
sudo docker stop FileBrowser
sudo docker stop onedev
sudo docker stop os-status
sudo docker stop pgAdmin
sudo docker stop webcenter-frontend

sudo docker container rm docker-backend
sudo docker container rm FileBrowser
sudo docker container rm os-status
sudo docker container rm onedev
sudo docker container rm --volumes pgAdmin
sudo docker container rm webcenter-frontend

sudo docker image rm home_webcenter-docker-backend:latest
sudo docker image rm home_webcenter-os-status:latest
sudo docker image rm home_webcenter-webcenter-frontend:latest

cd docker && sudo docker compose up --detach