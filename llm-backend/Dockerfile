# every line in this file is like a layer (step)
FROM node:26-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

ENV PORT=2000

EXPOSE 2000

CMD ["node", "./app/index.js"]
