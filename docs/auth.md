# Authentification

## Backend

- Le backend utilise `@fastify/jwt` pour les tokens.
- `backend/src/plugins/jwt.ts` configure `accessToken` et `refreshToken`.
- `backend/src/plugins/auth-middleware.ts` ajoute `fastify.authenticate`.
- `backend/src/plugins/role-middleware.ts` ajoute `fastify.requireRole`.
- `backend/src/plugins/csrf.ts` active la protection CSRF.

## Flow d'authentification

1. L'utilisateur envoie ses identifiants à `/api/authentication/login`.
2. Le backend vérifie le token puis renvoie les données utilisateur.
3. Le front stocke le CSRF token via `setCsrfToken`.
4. Les requêtes suivantes incluent `x-csrf-token`.

## Points importants

- Le token CSRF est transmis dans chaque requête par l'intercepteur Axios.
- L'accès aux routes `admin` est limité au rôle `ADMIN`.
- La route `/api/user/update-password` nécessite authentification et CSRF.
- La route `/api/authentication/register` vérifie que `password === confirmPassword`.
