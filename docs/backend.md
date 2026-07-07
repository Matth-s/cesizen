# Backend

## Résumé

Le backend est développé avec Fastify et Prisma.
Il expose les API métiers et gère l'authentification, les rôles, la sécurité CSRF et les limites de requêtes.

## Entrée principale

- `backend/src/server.ts` : crée un serveur Fastify puis enregistre l'application.
- `backend/src/app.ts` : configure les plugins et enregistre les routes de l'API.

## Plugins

- `backend/src/plugins/prisma.ts` : connecte Prisma à la base de données.
- `backend/src/plugins/cors.ts` : configure CORS.
- `backend/src/plugins/jwt.ts` : configure deux JWT (`access` / `refresh`).
- `backend/src/plugins/csrf.ts` : active la protection CSRF.
- `backend/src/plugins/auth-middleware.ts` : ajoute `fastify.authenticate`.
- `backend/src/plugins/role-middleware.ts` : ajoute `fastify.requireRole`.
- `backend/src/plugins/swagger.ts` : expose la documentation Swagger sur `/api/documentation` en mode développement.

## Routes principales

- `backend/src/routes/route.ts` : point d'enregistrement des sous-routes.
- `backend/src/routes/auth-routes.ts`
- `backend/src/routes/user-routes.ts`
- `backend/src/routes/manage-account-routes.ts`
- `backend/src/routes/quiz-routes.ts`
- `backend/src/routes/page-routes.ts`
- `backend/src/routes/menu-routes.ts`
- `backend/src/routes/dashboard-route.ts`

## Schéma de données

- `backend/prisma/schema.prisma`
- Modèles : `User`, `Page`, `MenuItem`, `Quiz`, `Answer`.
- Enum `Role` : `ADMIN`, `USER`.

## Scripts utiles

- `npm run dev` : lance l'API en développement.
- `npm run build` : génère Prisma puis compile TypeScript.
- `npm run start` : lance l'API compilée.
- `npm run test` : exécute les tests Vitest.
