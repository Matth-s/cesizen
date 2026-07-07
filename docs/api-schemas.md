# API - Schémas

Les schémas TypeBox sont utilisés pour valider les entrées de l'API.

## Authentification

- `backend/src/schemas/authenticate-schema.ts`
  - `LoginSchema`
  - `registerSchema`
  - `confirmEmailSchema`
  - `askResetPasswordSchema`
  - `resetPasswordSchema`

## Utilisateur

- `backend/src/schemas/user-schema.ts`
  - `deleteUserSchema`
  - `deleteAccountSchema`
  - `updatePasswordSchema`
  - `userAdminSchema`

## Page

- `backend/src/schemas/page-schema.ts`
  - `createPageSchema`
  - `updatePageSchema`
  - `pageIdParams`
  - `pageSlugParams`

## Menu

- `backend/src/schemas/menu-schema.ts`
  - `createMenuItemSchema`
  - `updateMenuItemSchema`
  - `menuItemIdParams`

## Quiz

- `backend/src/schemas/quiz-schema.ts`
  - `getQuizResultSchema`
  - `updateDiagnosticWithAnswerSchema`
  - `quizIdParams`

## Exemple de payloads

### `POST /api/authentication/login`

```json
{
  "email": "user@example.com",
  "password": "Password123!"
}
```

### `POST /api/page/`

```json
{
  "title": "Titre de page",
  "description": "Description optionnelle",
  "content": "Contenu markdown ou HTML",
  "imageUrl": "https://example.com/image.png",
  "slug": "ma-page",
  "isPublished": true,
  "menuItemId": "123"
}
```
