FROM node:alpine as mybuild
WORKDIR /opt/app
COPY package.json .
RUN npm install
COPY . .
RUN npm run-script build

FROM nginx
COPY --from=mybuild /opt/app/build /usr/share/nginx/html
