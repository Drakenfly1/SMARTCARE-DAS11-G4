# SmartCare - API Gateway (Spring Boot)

Projet Maven autonome a placer dans `Backend/api-gateway/`, **a cote** de `Backend/eureka-server/` et `Backend/microservices/`.

## Contenu
- Java 17, Spring Boot 3.5.6, Spring Cloud 2025.0.0
- Spring Cloud Gateway Server Web MVC (pas WebFlux)
- Eureka Client + Spring Cloud LoadBalancer
- Deux profils : `static` (URL et ports), `dynamic` (`lb://` vers Eureka)
- Actuator health : `http://localhost:8080/actuator/health`

## Installation et demarrage Windows PowerShell
Depuis `smarthospital/Backend/api-gateway` :

```powershell
.\mvnw.cmd spring-boot:run
```

Par defaut, le profil `static` est actif. Pour le profil `dynamic` :

```powershell
.\mvnw.cmd spring-boot:run '-Dspring-boot.run.profiles=dynamic'
```

Alternativement, sous PowerShell :

```powershell
$env:GATEWAY_PROFILE='dynamic'
.\mvnw.cmd spring-boot:run
```

## Parametres
- `GATEWAY_PORT` (8080)
- `EUREKA_URL` (http://localhost:8761/eureka/)
- En mode static : `PATIENT_SERVICE_URL` (8081), `APPOINTMENT_SERVICE_URL` (8082), `EPRESCRIPTION_SERVICE_URL` (8083), `PHARMACY_SERVICE_URL` (8084), `SMART_SERVICE_URL` (8085)
- En mode dynamic : adapter les URI `lb://...` aux valeurs reelles de `spring.application.name` des microservices.

## Routes de depart a confirmer avec l'equipe

| Service | Chemins proposes | Nom Eureka propose |
|---|---|---|
| Patient | `/api/patients/**` | `PATIENT-SERVICE` |
| Appointment | `/api/appointments/**` | `APPOINTMENT-SERVICE` |
| ePrescription | `/api/prescriptions/**` | `E-PRESCRIPTION-SERVICE` |
| Pharmacy | `/api/medications/**`, `/api/categories/**`, `/api/stocks/**`, `/api/stock-movements/**`, `/api/dispensations/**` | `PHARMACY-SERVICE` |
| Smart | `/api/smart/**` | `SMART-SERVICE` |

Les chemins et ports ci-dessus sont une base d'integration, **pas** une confirmation des API des autres membres. Conserver les chemins d'origine : aucun StripPrefix par defaut.

## Tests
1. Demarrer `eureka-server` sur le port 8761.
2. Demarrer les microservices avec leurs propres ports (verifier leurs `application.properties`).
3. Demarrer la gateway. Un service aval absent peut provoquer une erreur (503 en dynamique, souvent 5xx en statique).
4. Tester `http://localhost:8080/actuator/health`.
5. Tester, apres confirmation de l'API Pharmacy, `http://localhost:8080/api/medications` (ou une route exposee par le controller).
6. Pour `dynamic`, verifier sur `http://localhost:8761` que les noms Eureka correspondent aux URI `lb://`.

## Securite et limites
Aucune authentification Keycloak n'est encore activee dans cette version : ne pas exposer publiquement cette gateway. Il faudra integrer la verification JWT et configurer CORS pour le frontend, ainsi que la resilience selon le cahier des charges.

## Git
Creer ce dossier sous `Backend/` dans une branche de travail, puis commit/push via PR conformement aux protections de `main`. Les dossiers `target/` et `.idea/` sont exclus.
