# --- STAGE 1: BUILDER ---
FROM node:24-alpine AS builder
WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
 
ARG DATABASE_URL
ENV DATABASE_URL=$DATABASE_URL

# Génération explicite du client et build
RUN npx prisma generate
RUN npm run build

 
FROM node:24-alpine
WORKDIR /app

ENV NODE_ENV=production

COPY package*.json ./ 
RUN npm ci --only=production
 
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=builder /app/node_modules/@prisma/client ./node_modules/@prisma/client
 
COPY --from=builder /app/dist ./dist

EXPOSE 3000

CMD ["node", "dist/server.js"]