FROM nginx

COPY . /app

WORKDIR /app

RUN apt-get update && \
    apt-get install -y curl git gnupg && \
    curl -sL https://deb.nodesource.com/setup_10.x | bash - && \
    apt-get install -y nodejs
RUN npm cache clean --force
RUN npm i yarn -g
RUN yarn install --cwd ./website
RUN yarn run build --cwd ./website

RUN cp -a website/build/fandogh/.  /usr/share/nginx/html/

EXPOSE 80

CMD [ "nginx", "-g", "daemon off;" ]