# Projet Fil Rouge : Tests & Qualité Logicielle
## Master 1 Expert - Tests et Tests Unitaires

Ce dépôt contient l'ensemble des travaux pratiques réalisés dans le cadre du module de tests. Le projet consiste en une application React intégrant un module de validation de données robuste, développé selon les principes du **TDD** (Test Driven Development) et validé par des **tests d'intégration**.

---

## Résumé des Activités

### Activité 1 : Module de Validation (Backend Logic)
Création d'un module JavaScript (`validator.js`) indépendant pour sécuriser les données utilisateur.
*   **Objectif** : Fournir des fonctions pures pour valider l'identité, l'âge (18+), le code postal et l'email.
*   **Méthodologie** : TDD avec Jest.
*   **Robustesse** : Gestion d'erreurs typées (`ValidationError`) et protection contre les failles simples (XSS).

### Activité 2 : Intégration React (Frontend UI)
Intégration du module dans un formulaire d'inscription React (`RegistrationForm.js`).
*   **Objectif** : Valider le comportement de l'interface utilisateur face à la logique métier.
*   **UX/UI** : Feedback visuel immédiat (champs rouges), bouton désactivé dynamiquement, notifications (Toaster).
*   **Tests** : Tests d'intégration avec **React Testing Library** pour simuler des parcours utilisateurs complexes (erreurs, corrections, succès).

### Activité 3 : Automatisation & Déploiement (CI/CD)
Mise en place d'une usine logicielle complète avec GitHub Actions.
*   **Objectif** : Automatiser les tests, la génération de documentation et le déploiement.
*   **Outils** : GitHub Actions, Codecov, GitHub Pages.
*   **Résultat** : À chaque push, le code est testé, la couverture vérifiée, et l'application (avec sa doc) est redéployée en production.  

### Activité 4 : E2E & Cohérence des Tests (Fullstack Testing)
Évolution vers une architecture SPA (Single Page Application) et validation des parcours complets.
*   **Objectif** : Garantir la persistance des données et la navigation fluide entre les vues.
*   **Architecture** : Mise en place de `react-router-dom` et gestion d'état partagé (Lift State Up).
*   **Tests E2E** : Implémentation de scénarios nominaux et d'erreurs avec **Cypress** (ex: Ajout utilisateur -> Vérification liste Accueil).
*   **Pyramide de Tests** : Corrélation entre TU (règles), TI (composants) et E2E (parcours).

### Activité 5 : Simulation d'API & Résilience
Transition vers une architecture connectée (API REST) et sécurisation des tests.
*   **Objectif** : Tester le comportement de l'application face aux délais et erreurs réseaux (400, 500) sans dépendre d'un backend réel.
*   **Technique** : Mocking complet avec Jest (`jest.mock`) et Stubbing réseau avec Cypress (`cy.intercept`).
*   **Résultat** : Une application résiliente qui informe l'utilisateur en cas de panne, validée par des tests isolés et rapides.

---

## Installation et Démarrage

### Prérequis
*   Node.js (v14+ recommandé)
*   npm

### Procédure

1.  **Cloner le dépôt** :
    ```bash
    git clone https://github.com/PierreTDX/Test_et_Test_unitaire.git
    ```

2.  **Accéder au dossier du projet** :
    ```bash
    cd my-app
    ```

3.  **Installer les dépendances** :
    ```bash
    npm install
    ```

## Commandes Disponibles

*   `npm start` : Lance l'application en mode développement sur http://localhost:3000.
*   `npm test` : Lance la suite complète de tests (Unitaires et Intégration) avec surveillance des fichiers.
*   `npm run jsdoc` : Génère la documentation technique du code dans le dossier `./public/docs`.
*   `npm run cypress` : Ouvre l'interface de test E2E Cypress.  
*   `npm run serve` : Construit et sert l'application localement (simule GitHub Pages).  
*   `npm run scenarios` : Exécute le script de démonstration des validateurs dans la console.

## Documentation

*   [Détails Activité 1](https://github.com/PierreTDX/Test_et_Test_unitaire/blob/main/my-app/Activite1.md)
*   [Détails Activité 2](https://github.com/PierreTDX/Test_et_Test_unitaire/blob/main/my-app/Activite2.md)
*   [Détails Activité 3](https://github.com/PierreTDX/Test_et_Test_unitaire/blob/main/my-app/Activite3.md)  
*   [Détails Activité 4](https://github.com/PierreTDX/Test_et_Test_unitaire/blob/main/my-app/Activite4.md)
*   [Détails Activité 5](https://github.com/PierreTDX/Test_et_Test_unitaire/blob/main/my-app/Activite5.md)
*   [Plan de Test](https://github.com/PierreTDX/Test_et_Test_unitaire/blob/main/my-app/TEST_PLAN.md)

---
*Réalisé par Pierre TONDEUX*
