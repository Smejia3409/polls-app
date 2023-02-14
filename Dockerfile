FROM node:16

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .


ENV port=5000

EXPOSE 3000 5000

CMD ["npm","run","app"]