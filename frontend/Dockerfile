FROM node:13.12.0-alpine as build

RUN mkdir -p /app/src

WORKDIR /app/src

COPY ["package.json", "package-lock.json", "./"]

RUN npm install --silent

RUN npm install react-scripts@3.4.1 -g --silent

COPY . .

RUN npm run build

EXPOSE 80

FROM nginx:stable-alpine

COPY --from=build /app/src/build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]