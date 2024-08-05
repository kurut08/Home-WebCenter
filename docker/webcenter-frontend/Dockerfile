FROM node:22.4.0-alpine3.20

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY webcenter-front/package.json ./
COPY webcenter-front/package-lock.json ./

RUN npm install

COPY webcenter-front ./

RUN npm run build
RUN npm install -g serve
CMD ["serve", "-s", "build"]