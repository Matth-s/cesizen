# Mobile / User Front

## Présentation

Application client multiplateforme construite avec React, Vite et Capacitor.

## Entrée principale

- `user-front/src/main.tsx` : point d'entrée de l'application.
- `user-front/src/App.tsx` : définition des routes et logique d'initialisation Capacitor.

## Routes côté client

- `/authentification/connexion`
- `/authentification/inscription`
- `/authentification/confirmer-email`
- `/authentification/mot-de-passe-oublie`
- `/authentification/reinitialiser-mot-de-passe`
- `/`
- `/parametres`
- `/diagnostic`
- `/dynamic/:id`
- `/dynamic/:id/:pageId`

## Frontend API

- `user-front/src/lib/api-client.ts` : configuration `axios`, `baseURL: '/api'`, interception CSRF.
- Les appels API sont regroupés dans `user-front/src/features/*/api`.

## Capacitor

- Utilisation de `@capacitor/app`, `@capacitor/keyboard`, `@capacitor/status-bar`.
- Gestion des URLs profondes pour la confirmation d'email et la réinitialisation de mot de passe.

## Scripts utiles

- `npm run dev`
- `npm run build`
- `npm run lint`
- `npm run test`
