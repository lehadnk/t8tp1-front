FROM node:21-alpine as build
WORKDIR /app
COPY . /app
COPY /inf/prod/.env.prod /app/.env
RUN apk add git
RUN npm install
RUN npm run build

FROM node:21-alpine
WORKDIR /app
RUN npm install dotenv
COPY --from=build /app/build /app
COPY package.json /app/package.json
COPY /inf/prod/.env.prod /app/.env