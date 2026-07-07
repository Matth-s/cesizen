# Nginx

Le fichier `nginx.conf` orchestre le reverse proxy.

## Règles principales

- `/api/` est routé vers `http://api:3000`
- `/` est routé vers `http://backoffice:5173`

## En-têtes de sécurité

- `Strict-Transport-Security`
- `X-Content-Type-Options`
- `X-Frame-Options`
- `Content-Security-Policy`
