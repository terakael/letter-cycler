FROM nginx:latest

COPY src/. /usr/share/nginx/html
COPY src/assets/. /usr/share/nginx/html/assets
