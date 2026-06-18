# Bookmanager — Application de gestion de bibliothèque personnelle

> Projet collaboratif développé en méthodologie **Scrum** pour explorer les cycles courts, le découpage en sprints et les rituels agiles.

Bookmanager est une application web full-stack permettant de parcourir un catalogue de livres, de constituer sa bibliothèque personnelle et de suivre l'avancement de ses lectures en temps réel.

---

## Fonctionnalités

| Fonctionnalité | Description |
|---|---|
| Catalogue général | Consultation de l'ensemble des livres mis à disposition par les administrateurs |
| Bibliothèque personnelle | Ajout d'un livre depuis le catalogue en un clic |
| Suivi de lecture dynamique | Modification du statut (`À lire` / `En cours` / `Lu`) via un sélecteur dans la sidebar — mis à jour via `PATCH` |
| Filtrage | Tri en temps réel des livres selon leur statut de lecture |
| Retrait de livres | Suppression d'un ouvrage de sa collection via `DELETE`, avec fermeture automatique de l'interface |

---

## Stack technique

**Frontend**
- React + TypeScript + Vite
- Axios (instance centralisée avec gestion des headers d'authentification)
- CSS

**Backend**
- Java / Spring Boot
- Spring Data JPA
- REST API

**Base de données**
- H2 Database (en mémoire, volatile — adapté aux tests)

**Infrastructure**
- Docker et Docker Compose

---

## Installation et lancement

L'intégralité de l'application (frontend, backend, base de données) est conteneurisée.

### Prérequis

- [Docker Desktop](https://www.docker.com/products/docker-desktop/)
- [Git](https://git-scm.com/)

### 1. Cloner le dépôt

```bash
git clone <URL_DE_TON_DEPOT_GIT>
cd bookmanager
```

### 2. Lancer l'application

Depuis la racine du projet (là où se trouve `docker-compose.yml`) :

```bash
docker-compose up --build
```

### 3. Accéder à l'application

| Service | URL |
|---|---|
| Interface frontend | http://localhost:3000 |
| API backend | http://localhost:8080 |

---

## Équipe

| Nom | Rôle technique | Rôle Scrum |
|---|---|---|
| Elisa Robeau | Frontend — React / TypeScript | Scrum Master |
| Lina Bader | Backend — Java / Spring Boot | Product Owner |

---

## Bilan méthodologique — Scrum

Ce projet a été l'occasion d'expérimenter concrètement le framework **Scrum** en conditions réelles :

- **Sprints courts** pour livrer des incréments fonctionnels régulièrement
- **Daily Scrums** pour synchroniser l'équipe et lever les blocages rapidement
- **Rétrospectives** pour s'améliorer en continu

> La communication constante entre frontend et backend s'est révélée importante pour garantir une expérience utilisateur cohérente et éviter les régressions lors des ajustements d'architecture.
