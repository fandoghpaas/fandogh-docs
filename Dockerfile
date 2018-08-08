FROM nginx:alpine
COPY /.docz/dist /usr/share/nginx/html/
CMD ["nginx", "-g", "daemon off;"]
