# Backoffice

## Présentation

Application administrateur construite avec React, Vite, Redux, React Query et TailwindCSS.

## Entrée principale

- `backoffice/src/main.tsx` : point d'entrée de l'application.
- `backoffice/src/App.tsx` : définition des routes et logique d'authentification.

## Routes côté client

- `/authentification/connexion`
- `/`
- `/utilisateurs`
- `/pages`
- `/pages/nouveau`
- `/pages/modifier/:id`
- `/pages/:id`
- `/menu`
- `/diagnostics`
- `/diagnostics/:id`

## Frontend API

- `backoffice/src/lib/api-client.ts` : configuration `axios`, `baseURL: '/api'`, interception CSRF.
- Les appels API sont regroupés dans `backoffice/src/features/*/api`.

## Features

- Authentification
- Gestion des utilisateurs
- Gestion des pages
- Gestion du menu
- Diagnostics
- Dashboard admin

## Scripts utiles

- `npm run dev`
- `npm run build`
- `npm run lint`
- `npm run test`
- `npm run test:e2e`
