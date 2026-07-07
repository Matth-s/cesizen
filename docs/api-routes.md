# API - Routes

## Préfixe global

L'API est servie sur `/api`.

## Routes principales

### Authentication

- `POST /api/authentication/login`
- `POST /api/authentication/admin/login`
- `POST /api/authentication/register`
- `POST /api/authentication/confirm-email`
- `POST /api/authentication/ask-reset-password`
- `PUT /api/authentication/reset-password`

### User

- `GET /api/user/current`
- `PUT /api/user/update-password`
- `POST /api/user/delete`
- `POST /api/user/logout`

### Admin

- `GET /api/admin/user-list`
- `POST /api/admin/create-admin-account`
- `PUT /api/admin/update-user-status`
- `DELETE /api/admin/delete-user`

### Quiz

- `GET /api/quiz/`
- `POST /api/quiz/:quizId`
- `GET /api/quiz/:quizId`
- `GET /api/quiz/all`
- `PUT /api/quiz/:quizId`

### Page

- `GET /api/page/published/:id`
- `GET /api/page/by-id/:id`
- `GET /api/page/`
- `POST /api/page/`
- `PUT /api/page/:id`
- `DELETE /api/page/:id`

### Menu

- `GET /api/menu/`
- `GET /api/menu/all`
- `POST /api/menu/`
- `PUT /api/menu/:id`
- `DELETE /api/menu/:id`

### Dashboard

- `GET /api/dashboard/`

### Health

- `GET /api/healt`

## Notes de sécurité

- Certaines routes nécessitent `fastify.authenticate`.
- Les routes d'administration requièrent également `fastify.requireRole([Role.ADMIN])`.
- Certaines actions sensibles utilisent `fastify.csrfProtection`.
