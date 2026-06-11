# every line in this file is like a layer (step)
FROM node:26-alpine

WORKDIR /src

COPY package*.json ./

RUN npm install

COPY . .

# generating a prisma client inside a container before creating an image
RUN npx prisma generate

ENV PORT=2000

EXPOSE 2000

CMD ["npm", "run", "dev"]
