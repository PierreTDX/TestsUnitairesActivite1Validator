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
*   `npm run scenarios` : Exécute le script de démonstration des validateurs dans la console.

## Documentation

*   [Détails Activité 1](https://github.com/PierreTDX/Test_et_Test_unitaire/blob/main/my-app/Activite1.md)
*   [Détails Activité 2](https://github.com/PierreTDX/Test_et_Test_unitaire/blob/main/my-app/Activite2.md)
*   [Détails Activité 3](https://github.com/PierreTDX/Test_et_Test_unitaire/blob/main/my-app/Activite3.md)
*   [Plan de Test](https://github.com/PierreTDX/Test_et_Test_unitaire/blob/main/my-app/TEST_PLAN.md)

---
*Réalisé par Pierre TONDEUX*
