### STAGE 1: Build ###
FROM node:20-alpine AS build
WORKDIR /app
COPY . .
RUN npm i
RUN npm run build --prod

### STAGE 2: Run ###
FROM nginx:stable-alpine
COPY --from=build /app/dist/frontend/browser /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
# CMD ["nginx", "-g", "daemon off