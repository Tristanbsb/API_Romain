# Projet Services Web

## Description

L’objectif de ce projet est de créer une API de gestion de base de données de Films. Pour cela
on va utiliser NodeJS avec le framework Express afin de créer les routes suivantes.

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

## Amélioration

Ce projet respecte tous les critères d'évaluation sauf la validation des modifications via ETag
