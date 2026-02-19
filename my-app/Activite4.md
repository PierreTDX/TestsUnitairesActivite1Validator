# E2E & Cohérence des Tests (Activité 4)
## Réalisé par Pierre TONDEUX le 19/02/2026  
*   **Dépôt GitHub** : [https://github.com/PierreTDX/Test_et_Test_unitaire](https://github.com/PierreTDX/Test_et_Test_unitaire)
  
---  
  
Cette quatrième activité marque l'évolution de l'application vers une **Single Page Application (SPA)** et l'introduction des tests de bout en bout (**E2E**) avec **Cypress**. L'objectif est de valider les parcours utilisateurs complets et la persistance des données lors de la navigation.  
(https://docs.cypress.io/app/references/configuration , https://filiphric.com/cypress-basics-before-beforeeach-after-aftereach)

## Objectifs de l'Activité

*   **Architecture SPA** : Implémentation d'une navigation fluide sans rechargement de page.
*   **Gestion d'État** : Centralisation des données (Lift State Up) pour partager la liste des utilisateurs entre les vues.
*   **Tests E2E** : Validation des scénarios nominaux et d'erreur traversant plusieurs pages.
*   **Pipeline CI/CD** : Intégration de l'exécution des tests E2E dans GitHub Actions. (https://docs.cypress.io/app/continuous-integration/github-actions , https://github.com/cypress-io/github-action/issues/55)

## 1. Évolution Architecturale

### Navigation & Routage
Installation de `react-router-dom` pour gérer les vues :
*   **Page d'Accueil (`/`)** : Affiche un message de bienvenue, un compteur dynamique ("X utilisateur(s) inscrit(s)") et la liste détaillée des inscrits.
*   **Page Formulaire (`/registration`)** : Contient le formulaire d'inscription existant.

### Gestion d'État (Lift State Up)
Pour assurer la cohérence des données entre la page d'inscription et l'accueil :
*   L'état (tableau des utilisateurs) est remonté dans le composant parent (`App.js`).
*   `App.js` distribue les données à `Home` (lecture) et la fonction d'ajout à `RegistrationForm` (écriture).
*   La logique pure reste isolée dans les utilitaires (Tests Unitaires), l'affichage dans les composants (Tests d'Intégration), et le parcours global est validé par Cypress.

## 2. Scénarios de Tests E2E (Cypress)

Les tests sont implémentés dans `cypress/e2e/navigation.cy.js` et couvrent deux parcours critiques :

### Scénario Nominal
1.  Navigation vers l'Accueil (`/`) → Vérification de l'état vide ("0 utilisateur").
2.  Navigation vers le Formulaire (`/registration`).
3.  Saisie et soumission d'un utilisateur valide.
4.  Retour à l'Accueil.
5.  **Validation** : Le compteur affiche "1 utilisateur" et la carte du nouvel utilisateur est présente.

### Scénario d'Erreur
1.  Départ avec un état pré-existant (1 utilisateur).
2.  Navigation vers le Formulaire.
3.  Tentative d'ajout invalide (ex: email déjà existant ou format incorrect).
4.  Vérification de l'affichage de l'erreur bloquante.
5.  Retour à l'Accueil.
6.  **Validation** : Le compteur reste à "1 utilisateur" et la liste est inchangée.

## 3. Intégration Continue (CI/CD)

Le pipeline GitHub Actions (`.github/workflows/build_test_react.yml`) a été mis à jour pour inclure l'étape Cypress :
1.  Installation et Build.
2.  Exécution des Tests Unitaires & Intégration (`npm test`).
3.  **Exécution des Tests E2E** : Lancement de l'application et exécution de Cypress en mode "headless" (sans interface graphique).

## Commandes Disponibles

### Lancer Cypress (Interface Graphique)
Pour développer et déboguer les tests E2E localement.
```bash
npm run cypress
```

### Lancer Cypress (Mode Headless)
Pour exécuter les tests en ligne de commande (comme dans le CI).
```bash
npx cypress run
```

## Livrables

*   **Code** : Application SPA fonctionnelle (`App.js`, `Home.js`, `RegistrationForm.js`).
*   **Tests** : Fichier `navigation.cy.js`.
*   **Tag Git** : `activite_4`