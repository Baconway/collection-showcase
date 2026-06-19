FROM node:alpine

WORKDIR /showcase

COPY . .

RUN npm install
RUN npm run build

CMD node ./dist/server/entry.mjs