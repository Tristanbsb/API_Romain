# Projet Services Web - EPSI Bachelor 3 DevOps

## Description

L’objectif de ce projet est de réaliser une API de gestion de base de données de Films en
NodeJS avec le framework Express selon les spécifications suivantes.

## Routes

| Verbe  | Chemin      | Description                                                                                                         |
| ------ | ----------- | ------------------------------------------------------------------------------------------------------------------- |
| GET    | /actor      | retourne la liste des acteurs                                                                                       |
| GET    | /actor/{id} | retourne la fiche de l'acteur portant l'ID indiquée                                                                 |
| POST   | /actor      | Crée l'acteur selon les informations du corps de la requête                                                         |
| DELETE | /actor/{id} | Supprime l'acteur                                                                                                   |
| GET    | /genre      | Retourne la liste des genres                                                                                        |
| POST   | /genre      | Crée le genre selon les informations du corps de la requête                                                         |
| DELETE | /genre/{id} | Supprime le genre (sauf si utilisé dans un ou plusieurs films)                                                      |
| GET    | /film       | Retourne la liste des films, avec les informations de genre et les fiches acteurs associées                         |
| GET    | /film/{id}  | Retourne la fiche du film portant l'ID indiquée, avec les informations de genre et les fiches acteurs associées     |
| POST   | /film       | Crée le film selon les informations du corps de la requête (erreur si les acteurs et/ou le genre n'existe pas)      |
| PUT    | /film/{id}  | Modifie le film selon les informations du corps de la requête (erreur si les acteurs et/ou le genre n'existent pas) |
| DELETE | /film/{id}  | Supprime le film                                                                                                    |

## Critères de notation

| Status | Réalisation                                                          | Points |
| ------ | -------------------------------------------------------------------- | ------ |
| ✅     | Mise en place d'une API NodeJS + ExpressJS écoutant sur le port 8000 | 1      |
| ✅     | Respect du format d'URL                                              | 0.5    |
| ✅     | Sécurisation via API Key                                             | 2      |
| ✅     | Réponses au format JSON                                              | 0.5    |
| ❌     | Validation des modifications via ETag                                | 3      |
| ✅     | 13 points d'entrée                                                   | 13     |
