FROM nginx

COPY . /app

WORKDIR /app

RUN apt-get update && \
    apt-get install -y curl git gnupg && \
    curl -sL https://deb.nodesource.com/setup_10.x | bash - && \
    apt-get install -y nodejs
RUN npm cache clean --force
RUN npm i yarn -g
RUN yarn --cwd ./website install
RUN yarn --cwd ./website run build

RUN cp -a website/build/fandogh/.  /usr/share/nginx/html/

EXPOSE 80

CMD [ "nginx", "-g", "daemon off;" ]