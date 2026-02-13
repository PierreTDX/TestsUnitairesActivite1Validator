# Module de Validation de Données (Activité 1)
## Réalisé par Pierre TONDEUX le 06/02/2026  
nb : le nom du repos changera pour les prochaines activités

Ce projet est un module JavaScript moderne (ESM) implémentant des règles de validation strictes pour des données utilisateur. Il a été développé en suivant la méthodologie **TDD (Test Driven Development)**.

## Sujet et Règles de Validation

L'objectif est de fournir des fonctions de validation robustes respectant les contraintes suivantes :

*   **Âge** :
    *   Calcul précis basé sur la date de naissance (au jour près).
    *   **Rejet strict** si l'utilisateur a moins de 18 ans.
*   **Code Postal** :
    *   Format français uniquement.
    *   Doit comporter exactement **5 chiffres**.
*   **Identité (Nom/Prénom)** :
    *   Autorise uniquement les lettres, les accents et les tirets.
    *   Interdit les chiffres et les caractères spéciaux.
    *   Protection contre les injections XSS simples (ex: `<script>`).
*   **Email** :
    *   Validation du format standard d'une adresse email.

> **Note technique** : En cas d'erreur, les fonctions ne retournent pas simplement `false`, mais lèvent une exception personnalisée `ValidationError` contenant un code d'erreur précis (ex: `MINOR`, `INVALID_FORMAT`).

## Installation

Assurez-vous d'avoir Node.js installé et Npm.

```bash
git clone https://github.com/PierreTDX/TestsUnitairesActivite1Validator.git
cd TestsUnitairesActivite1Validator
npm install
```

## Utilisation

Vous pouvez importer les fonctions de validation dans votre propre code :

```javascript
import { calculateAge, validateEmail, ValidationError } from "./src/validator.js";

try {
    // Exemple : Validation d'âge
    const userBirth = { birth: new Date("2010-05-13") };
    const age = calculateAge(userBirth);
    console.log(`Âge valide : ${age} ans`);

} catch (error) {
    if (error instanceof ValidationError) {
        console.error(`Erreur de validation (${error.code}) : ${error.message}`);
    } else {
        console.error("Erreur inattendue :", error);
    }
}
```

## Scripts Disponibles

Le projet inclut plusieurs scripts NPM pour faciliter le développement :

### 1. Lancer les tests (TDD)
Exécute la suite de tests unitaires avec **Jest** et génère le rapport de couverture de code.
```bash
npm testjest
```

### 2. Lancer les scénarios de démonstration
Exécute un script qui simule différents cas d'utilisation (succès et échecs) et affiche les résultats dans la console.
```bash
npm run scenarios
```

### 3. Générer la documentation
Génère la documentation technique du code à partir des commentaires JSDoc.
```bash
npm run jsdoc
```

## Liens Utiles (Local)

Une fois les commandes ci-dessus exécutées, vous pouvez consulter les rapports générés :

*    **Documentation Technique (JSDoc)** : [Ouvrir docs/index.html](docs/index.html)
*    **Rapport de Couverture (Coverage)** : [Ouvrir coverage/lcov-report/index.html](coverage/lcov-report/index.html)