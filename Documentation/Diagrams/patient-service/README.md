# Diagrammes - patient-service

Projet **SmartCare**  - Module AWD, ESPRIT 2026-2027

Ce dossier contient les diagrammes de conception du microservice **patient-service** (microservice 1), conçu avec **Spring Boot** et **MySQL**.

## Rôle du microservice

Le patient-service gère les patients, leurs admissions et leur assurance. Il expose une API REST (ajout, liste, recherche, modification et suppression d'un patient) et publie des événements d'admission pour les autres services.

## Contenu du dossier

|Fichier|Diagramme|Ce qu'il montre|
|-|-|-|
|`01-usecase-patient-service`|Cas d'utilisation|Les acteurs (réceptionniste/admin, médecin, autres microservices) et les fonctionnalités du service|
|`02-class-patient-service`|Classes|Les entités `Patient`, `Admission`, `Insurance`, leurs relations, et les couches Controller, Service, Repository|
|`03-sequence-patient-service`|Séquence|Deux scénarios : prise de rendez-vous (synchrone, avec cas de panne) et ajout d'un patient suivi d'un événement (asynchrone)|
|`04-architecture-patient-service`|Architecture|Frontend, API Gateway, Keycloak, Eureka, Config Server, patient-service, base MySQL, broker de messages et autres microservices|

Chaque diagramme est fourni en format :

* `.png` : l'image exportée, utilisée dans la présentation et le dossier technique.

## Générer les images à partir des fichiers `.puml`

* **En ligne** : coller le contenu du fichier sur [plantuml.com/plantuml](https://www.plantuml.com/plantuml), puis exporter en PNG ou SVG.

## 

