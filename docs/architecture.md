# Architecture générale

Le projet `projet-perso-fullstack` contient trois applications principales :

- `backend/` : serveur API Fastify en TypeScript, gère les utilisateurs, les pages, le menu, les quiz et les tableaux de bord.
- `backoffice/` : application React/Vite pour l'administration, utilise Redux, React Query et des routes protégées.
- `user-front/` : application React/Vite/Capacitor pour le client mobile et web, avec authentification, diagnostics et pages dynamiques.

## Flux de données

1. L'utilisateur se connecte via `backoffice` ou `user-front`.
2. Le front appelle l'API `backend` via `axios` avec `baseURL: '/api'`.
3. Le backend utilise Prisma pour accéder à PostgreSQL.
4. Les administrateurs peuvent gérer les pages, le menu et les utilisateurs.

## Diagramme simplifié

- `user-front` / `backoffice` → API `backend` → PostgreSQL
- `backend` expose `/api/*` et `/api/documentation` (Swagger en dev)
- `docker-compose.yml` orchestre : `postgres-db`, `api`, `backoffice`, `mobile-app`
