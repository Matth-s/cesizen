FROM node:24-alpine

WORKDIR /app

COPY package*.json ./

RUN npm ci
RUN npm install -g serve

COPY . .

RUN npm run build

EXPOSE 5173

CMD ["serve", "-s", "dist", "-l", "5173"]