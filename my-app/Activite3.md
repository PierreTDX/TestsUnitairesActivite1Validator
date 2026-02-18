# Automatisation CI/CD (Activité 3)
## Réalisé par Pierre TONDEUX le 18/02/2026

## Livrables et Liens

*   **Dépôt GitHub** : [https://github.com/PierreTDX/Test_et_Test_unitaire](https://github.com/PierreTDX/Test_et_Test_unitaire)
*   **Application Déployée** : [https://pierretdx.github.io/Test_et_Test_unitaire/](https://pierretdx.github.io/Test_et_Test_unitaire/)
*   **Documentation Technique** : [https://pierretdx.github.io/Test_et_Test_unitaire/docs/](https://pierretdx.github.io/Test_et_Test_unitaire/docs/)
*   **Rapport Codecov** : [https://app.codecov.io/github/PierreTDX/Test_et_Test_unitaire](https://app.codecov.io/github/PierreTDX/Test_et_Test_unitaire)
*   **Tag Git** : `activite_3`

Cette troisième étape transforme le dépôt GitHub en une usine logicielle complète via **GitHub Actions**. L'objectif est d'automatiser le cycle de validation, la mesure de la qualité et le déploiement continu.

## Objectifs de l'Activité

Il s'agit de configurer un workflow GitHub Actions répondant aux exigences suivantes :

*   **Déclenchement Automatique** : Le pipeline se lance à chaque push sur la branche principale (`main`).
*   **Validation de la Qualité** : Installation des dépendances et exécution de tous les tests (Unitaires et Intégration).
*   **Rapport de Couverture** : Génération du rapport de couverture et envoi automatique à **Codecov**.
*   **Documentation Automatisée** : Génération de la JSDoc lors du build.
*   **Construction et Artefact** : Build de l'application React pour la production, incluant la documentation dans un sous-dossier `/docs`.
*   **Déploiement Continu** : Publication de l'artefact sur **GitHub Pages**.

## Implémentation Technique

Le workflow est défini dans `.github/workflows/build_test_react.yml`.

### Étapes du Pipeline
1.  **Checkout** : Récupération du code.
2.  **Setup Node** : Configuration de l'environnement Node.js.
3.  **Install & Build** :
    *   `npm ci` (installation propre).
    *   `npm run jsdoc` (génération de la doc avant le build pour l'inclure dans l'artefact).
    *   `npm run build` (création de l'artefact de production).
4.  **Test** : Exécution de `npm test` avec couverture.
5.  **Codecov** : Upload du rapport de couverture.
6.  **Deploy** : Déploiement du dossier `build` (contenant l'app et la doc) sur GitHub Pages.

---
*Note : les secrets (CODECOV_TOKEN) sont configurés dans les paramètres du dépôt GitHub.*