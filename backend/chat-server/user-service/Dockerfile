FROM node:18-alpine

WORKDIR /usr/src/app23

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 8081

CMD [ "npm", "start" ]