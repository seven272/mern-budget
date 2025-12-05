FROM node:22-alpine

WORKDIR /app

EXPOSE 5173

COPY package.json package-lock.json ./

RUN npm install

COPY . ./

CMD [ "npm", "run", "start" ]