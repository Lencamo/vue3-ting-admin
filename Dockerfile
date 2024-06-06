FROM node:18.18.2-bullseye-slim
COPY ./ /ting-ui
WORKDIR /ting-ui
RUN npm install --registry=https://registry.npmmirror.com/
RUN npm run build-only

FROM nginx:1.17.10
RUN mkdir -p /app/ting-ui
COPY --from=0 /ting-ui/dist /app/ting-ui
COPY ./nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
