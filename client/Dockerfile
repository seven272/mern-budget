FROM node:22-alpine AS react-build

WORKDIR /app

EXPOSE 4000

COPY package.json /app

COPY package-lock.json /app

RUN npm install

COPY . /app

RUN npm run build

FROM nginx:stable-alpine
EXPOSE 3001
COPY --from=react-build /app/dist /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY --from=react-build /app/nginx.conf /etc/nginx/conf.d/default.conf
CMD [ "nginx", "-g", "daemon off;" ]