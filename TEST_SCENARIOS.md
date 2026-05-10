# Scénarios de Tests

Ce document présente des scénarios de tests fonctionnels et de non-régression pour le projet.

## 1. Tests Fonctionnels (Scénarios d'Usage)

| ID | Fonctionnalité | Description | Résultat Attendu |
|:---|:---|:---|:---|
| F01 | Authentification | Se connecter avec des identifiants valides | L'utilisateur reçoit un token JWT et accède au tableau de bord. |
| F02 | Création de Page | Un administrateur crée une nouvelle page avec un slug unique | La page est enregistrée en base et accessible via son slug. |
| F03 | Publication de Page | Passer le statut `isPublished` à `true` pour une page | La page devient visible pour les utilisateurs non-authentifiés. |
| F04 | Quiz Diagnostic | Un utilisateur répond à toutes les questions du quiz | Le score est calculé correctement selon les pondérations des réponses. |
| F05 | Gestion des Menus | Ajouter un élément au menu via le backoffice | Le nouvel élément apparaît dans la navigation du front-end utilisateur. |

## 2. Tests de Non-Régression (Cas Limites & Sécurité)

| ID | Scénario | Description | Résultat Attendu |
|:---|:---|:---|:---|
| NR01 | Doublon de Slug | Tenter de créer deux pages avec le même slug | Le système renvoie une erreur de validation (unicité). |
| NR02 | Accès Admin | Un utilisateur `USER` tente d'accéder à `/api/admin` | Le système renvoie un code 403 (Forbidden). |
| NR03 | Validation Password | Inscription avec un mot de passe ne respectant pas la regex | L'inscription est refusée avec un message d'erreur explicite. |
| NR04 | Suppression Menu | Supprimer un menu ayant des pages liées | Les pages liées sont soit dissociées, soit la suppression est bloquée (selon la politique choisie). |
| NR05 | Token Expiraire | Utiliser un token de réinitialisation de mot de passe expiré | Le système refuse le changement de mot de passe. |

## 3. Couverture des Tests Unitaires (Backend)

Les tests unitaires automatisés couvrent :
* **Services** : Logique métier (User, Page, Menu, Quiz)
* **Helpers** : Calculs et utilitaires (Score Quiz)
* **Schemas** : Validation des entrées (TypeBox)
