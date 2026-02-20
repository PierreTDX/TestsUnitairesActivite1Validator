# Simulation d'API & Résilience (Activité 5)
## Réalisé par Pierre TONDEUX le 20/02/2026  
*   **Dépôt GitHub** : [https://github.com/PierreTDX/Test_et_Test_unitaire](https://github.com/PierreTDX/Test_et_Test_unitaire)


Cette cinquième activité se concentre sur l'isolation du Front-End et la résilience de l'application face aux aléas du réseau. Nous abandonnons le `localStorage` au profit d'appels API réels (simulés via **JSONPlaceholder**), tout en garantissant la stabilité des tests via le **Mocking** (Jest) et le **Stubbing** (Cypress).

## Objectifs de l'Activité

*   **Découplage** : Remplacement du stockage local par des appels HTTP asynchrones (Axios).
*   **Isolation des Tests** : Utilisation de Mocks pour tester la logique UI sans dépendre d'une API externe.
*   **Résilience** : Gestion et affichage des erreurs serveur (400, 500) pour l'utilisateur.
*   **CI/CD** : Sécurisation du déploiement avec injection de secrets (Token API).

## 1. Évolution & Mocking (Jest)

### Intégration d'Axios
Le service `api.js` a été créé pour centraliser les appels HTTP (`GET` pour la liste, `POST` pour l'inscription). L'application gère désormais les états de chargement (`loading`) et les retours d'erreurs HTTP.

### Tests d'Intégration avec Mocks
Pour garantir des tests rapides et déterministes, nous utilisons `jest.mock('axios')`. Cela permet de simuler les réponses du serveur sans effectuer de véritables requêtes réseau.

Les scénarios suivants sont couverts dans `App.test.js` :
*   **Succès (200/201)** : Le parcours nominal (affichage de la liste, ajout d'un utilisateur).
*   **Erreur Métier (400)** : Simulation d'un email déjà existant -> Vérification du message d'erreur spécifique.
*   **Crash Serveur (500)** : Simulation d'une panne API -> Vérification que l'application ne plante pas et affiche une alerte ("Server is down").

## 2. Adaptation E2E (Cypress)

Les tests E2E (`navigation.cy.js`) ont été adaptés pour ne plus dépendre du `localStorage` ni de l'API réelle de JSONPlaceholder (qui ne persiste pas les données).

Nous utilisons `cy.intercept` pour "bouchonner" les routes API :
*   Interception du `GET` pour fournir une liste d'utilisateurs contrôlée.
*   Interception du `POST` pour simuler des succès ou des échecs (400, 500) et vérifier la réaction de l'interface (Toasts, messages d'erreur).

## 3. Mise à jour de la Pipeline

Le workflow GitHub Actions a été configuré pour injecter les variables d'environnement nécessaires lors du build et des tests :
*   `REACT_APP_API_URL` : L'URL de l'API.
*   `REACT_APP_API_TOKEN` : Injection sécurisée du token (simulé pour l'exercice).

## Livrables

*   **Code** : Service API (`api.js`), Gestion des erreurs dans `App.js`.
*   **Tests** : Tests d'intégration mockés (`App.test.js`, `api.test.js`) et E2E (`navigation.cy.js`).
*   **Tag Git** : `activite_5`