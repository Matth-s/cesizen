# Documentation Cesizen

Bienvenue dans la documentation de l'application Cesizen.

Cette documentation couvre :

- l'architecture générale du projet
- le backend Fastify + Prisma
- l'application backoffice React/Vite
- l'application mobile user-front React/Vite/Capacitor
- l'API et les schémas de validation
- le déploiement Docker et Nginx
- les tests

---

## Structure du projet

- `backend/` : API Fastify, base de données Prisma, authentification, administration.
- `backoffice/` : interface web de gestion (admin).
- `user-front/` : application mobile/web basée sur Capacitor.
- `docker-compose.yml` : orchestration des services.
- `nginx.conf` : reverse proxy pour l’API et le backoffice.
