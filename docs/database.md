# Base de données

## Prisma

- `backend/prisma/schema.prisma` définit le modèle de données.
- Provider : `postgresql`

## Modèles

- `User`
  - `id`, `email`, `password`, `role`, `username`, `createAt`, `isActive`
  - `emailVerified`, `emailConfirmationToken`, `resetPasswordToken`
- `Page`
  - `title`, `description`, `content`, `imageUrl`, `slug`, `isPublished`
  - relation optionnelle avec `MenuItem`
- `MenuItem`
  - `label`, `path`, `show`
  - relation avec `Page`
- `Quiz`
  - `title`, `createdAt`
  - relation avec `Answer`
- `Answer`
  - `name`, `value`, `quizId`

## Commandes Prisma

- `npx prisma generate`
- `npx prisma db push`
- `npx prisma studio`
