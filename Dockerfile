FROM node:alpine
RUN mkdir -p /var/www/app && chown -R node:node /var/www/app
WORKDIR /var/www/app
COPY package.json package-lock.json .
USER node
COPY . .
RUN chown -R node:node .
EXPOSE 8080
