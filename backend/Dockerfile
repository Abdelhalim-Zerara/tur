FROM node:20.10.0

WORKDIR /usr/app

COPY package.json .

RUN npm install

COPY . .

EXPOSE 80

CMD ["npm", "start"]
