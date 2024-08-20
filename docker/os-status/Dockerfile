FROM node:22.4.1-alpine3.20

WORKDIR /app

COPY package.json ./

RUN apk add python3
RUN apk add make
RUN apk add g++
RUN npm install

COPY . .

EXPOSE 3005

CMD ["node",  "index.js"]