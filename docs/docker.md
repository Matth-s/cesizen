# Docker

## Orchestration

Le projet utilise `docker-compose.yml` pour lancer :

- `postgres-db` : base de données PostgreSQL
- `api` : backend Fastify
- `backoffice` : front backoffice
- `mobile-app` : interface user-front

## Service API

- `backend/Dockerfile`
- Variables d'environnement : `DATABASE_URL`, `DIRECT_URL`, `JWT_ACCESS_PRIVATE`, `JWT_ACCESS_PUBLIC` , `JWT_REFRESH_PRIVATE`, `JWT_REFRESH_PUBLIC`, `JWT_REFRESH_SECRET`, `FRONTEND_URL`
- Commande de lancement : `npx prisma generate && npx prisma db push && node dist/server.js`

## Liens

- `api` expose le backend sur le port `3000`
- `backoffice` expose le front admin sur le port `5173`
- `mobile-app` expose le front mobile sur le port `5174`
