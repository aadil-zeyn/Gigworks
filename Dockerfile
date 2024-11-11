FROM node:20.15.1

WORKDIR  /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8080

ENTRYPOINT ["node", "app.js"]