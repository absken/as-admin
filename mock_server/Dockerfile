FROM node:alpine as debug
WORKDIR /mock_server
COPY package.json .
COPY package-lock.json .
RUN npm ci
COPY . .
EXPOSE 8080
CMD ["npm", "start"]
