# build
FROM node:20.9.0-alpine3.18 as builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
# serve
FROM nginx:1.16.0-alpine
COPY --from=builder /app/dist /usr/share/nginx/html

RUN rm /etc/nginx/conf.d/default.conf

COPY deploy/nginx/nginx.conf /etc/nginx/conf.d

EXPOSE 80

# CMD ["npm", "run", "dev"]
CMD ["nginx", "-g", "daemon off;"]