FROM nginx:alpine

COPY default.conf /etc/nginx/conf.d/default.conf

EXPOSE 9090

ENTRYPOINT ["nginx","-g","daemon off;"]

