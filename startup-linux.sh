#! /bin/bash
echo ------------Updating local repository------------
git pull
echo ------------------------------------------------------------------------

echo -e "\n\n\n"

echo ------------Stopping running docker containers------------
sudo docker stop docker-backend
sudo docker stop FileBrowser
sudo docker stop onedev
sudo docker stop os-status
sudo docker stop pgAdmin
sudo docker stop webcenter-frontend
echo ------------------------------------------------------------------------

echo -e "\n\n\n"

echo ------------Removing docker containers------------
sudo docker container rm docker-backend
sudo docker container rm FileBrowser
sudo docker container rm os-status
sudo docker container rm onedev
sudo docker container rm --volumes pgAdmin
sudo docker container rm webcenter-frontend
echo ------------------------------------------------------------------------

echo -e "\n\n\n"

echo ------------Removing images of local available containers------------
sudo docker image rm home_webcenter-docker-backend:latest
sudo docker image rm home_webcenter-os-status:latest
sudo docker image rm home_webcenter-webcenter-frontend:latest
echo ------------------------------------------------------------------------

cd docker && sudo docker compose up --detach