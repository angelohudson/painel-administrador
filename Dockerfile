# build environment
FROM node:12.2.0-alpine as build
WORKDIR /painel-adtimbo
ENV PATH /painel-adtimbo/node_modules/.bin:$PATH
COPY package.json /painel-adtimbo/package.json
RUN npm install --silent
RUN npm install react-scripts@3.0.1 -g --silent
COPY . /painel-adtimbo
RUN npm run build

# production environment
FROM nginx:1.16.0-alpine
COPY --from=build /painel-adtimbo/build /usr/share/nginx/html
COPY --from=build /painel-adtimbo/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
