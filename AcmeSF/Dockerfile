FROM node:alpine

WORKDIR /app

COPY package.json .
COPY pnpm-lock.yaml .
COPY index.html .
COPY style.css .
COPY vite.config.ts .
COPY ./src ./src
COPY ./public ./public
# COPY ./ /app

RUN npm i -g pnpm

RUN pnpm i

EXPOSE 5173

CMD npm run dev