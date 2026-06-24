# --- ÉTAPE 1 : Le Build (Image temporaire) ---
FROM node:24-alpine AS builder

WORKDIR /app

COPY package*.json ./

# On installe TOUTES les dépendances (y compris les devDependencies comme Vite)
RUN npm install

COPY . .

# Génération du client Prisma et build du projet
RUN npx prisma generate
RUN npm run build

# --- ÉTAPE 2 : L'image de Production (Celle qui sera poussée sur Git) ---
FROM node:24-alpine AS runner

WORKDIR /app

COPY package*.json ./
 
RUN npm ci --omit=dev
 
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=builder /app/prisma ./prisma

EXPOSE 3000
 
CMD ["sh", "-c", "npx prisma migrate deploy && node dist/server.js"]