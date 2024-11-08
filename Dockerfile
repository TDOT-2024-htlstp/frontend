FROM node:18.20-alpine as build

WORKDIR /app

COPY package*.json ./

RUN npm install

RUN npm install -g @angular/cli

COPY . .

CMD ng serve -c production --host 0.0.0.0 --disable-host-check --port 80

