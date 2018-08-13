FROM nginx

COPY . /app

WORKDIR /app

RUN ls
RUN apt-get update && \
    apt-get install -y curl git gnupg && \
    curl -sL https://deb.nodesource.com/setup_10.x | bash - && \
    apt-get install -y nodejs
RUN npm install --prefix ./website
RUN npm run build --prefix ./website 

COPY website/build/fandogh  /usr/share/nginx/html/

EXPOSE 80

CMD [ "nginx", "-g", "daemon off;" ]