FROM node:latest

RUN mkdir -p /var/www

ADD . /var/www/

WORKDIR /var/www
RUN npm install

CMD node ./bin/www