# build
FROM node:20.9.0-alpine3.18 as builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
# RUN npm run build
# # serve
# FROM nginx:stable-alpine
# COPY --from=builder /usr/src/app/build /usr/share/nginx/html
# COPY --from=builder /usr/src/app/nginx/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80

CMD ["npm", "run", "dev"]
# CMD ["nginx", "-g", "daemon off;"]