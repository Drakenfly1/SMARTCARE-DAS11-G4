# Smart Service

Microservice 5 du projet SmartCare, responsable des statistiques hospitalières, de l'analyse des données et des prédictions intelligentes.

## Objectif
Développer un microservice indépendant utilisant Python et FastAPI pour analyser les informations hospitalières et produire des indicateurs facilitant la prise de décision.

## Technologies proposées
- Langage : Python
- Framework : FastAPI
- Analyse de données : Pandas
- Machine Learning : Scikit-learn
- Communication : API REST

## Fonctionnalités
- Récupérer les données nécessaires depuis les autres microservices
- Calculer le nombre total de patients
- Calculer le nombre total de rendez-vous
- Produire des statistiques sur les consultations
- Analyser les médicaments les plus utilisés
- Produire des statistiques sur les prescriptions médicales
- Générer des indicateurs pour le tableau de bord
- Analyser l'évolution des rendez-vous
- Réaliser des prédictions simples sur les rendez-vous futurs
- Créer les API REST avec FastAPI
- Tester et documenter les endpoints

## Branche GitHub
microserv5-smartService

## Communication avec les autres microservices
- Patient Service : récupérer les données statistiques des patients
- Appointment Service : analyser les rendez-vous et les consultations
- E-Prescription Service : analyser les prescriptions
- Pharmacy Service : récupérer les indicateurs sur les médicaments et les stocks

## Sécurité
- Utiliser des données anonymisées ou agrégées pour les analyses
- Protéger les accès aux API
- Ne pas exposer les informations médicales personnelles

## Livrables
- Code source Python fonctionnel
- API REST documentée
- Statistiques hospitalières
- Prédictions simples
- Tests des endpoints
