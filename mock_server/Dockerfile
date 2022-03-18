FROM node:alpine as debug
WORKDIR /mock_server
COPY package.json .
COPY package-lock.json .
RUN npm ci
COPY . .
CMD ["npm", "start"]
