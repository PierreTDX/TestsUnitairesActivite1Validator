/**
 * @file This script runs a series of demonstration scenarios for the validation functions.
 * It is intended to be executed from the command line to provide a quick overview of the module's behavior.
 * @author Pierre
 */

import { calculateAge, validatePostalCode, validateIdentity, validateEmail, validateCity, ValidationError } from "../../src/validator.js";

console.log("=== Lancement de quelques scénarios exemples ===");

/**
 * Executes a validation scenario and logs the result to the console.
 * @param {string} description - A description of the scenario being run.
 * @param {Function} fn - The function to execute for the scenario.
 */
function runScenario(description, fn) {
    try {
        const result = fn();
        const displayResult = result === true ? "Valide" : result;
        console.log(`[OK] ${description} -> Résultat : ${displayResult}`);
    } catch (error) {
        if (error instanceof ValidationError) {
            console.log(`[ERREUR ATTENDUE] ${description}  -> Code: ${error.code} | Message: "${error.message}" `);
        } else {
            console.log(`[ERREUR CRITIQUE] ${description} -> ${error.message}`);
        }
    }
}

// --- Scénarios Age ---
console.log("\n--- Tests Age ---");
let jean = {
    birth: new Date("01/01/1980")
};
let loise = {
    birth: new Date("05/13/2008")
};

runScenario("Adulte (Jean, né en 1980)", () => calculateAge(jean));
runScenario("Mineur (Loise, née en 2008)", () => calculateAge(loise));
runScenario("Date invalide", () => calculateAge({ birth: "pas une date" }));

// --- Scénarios Code Postal ---
console.log("\n--- Tests Code Postal ---");
runScenario("Code postal valide (33000)", () => validatePostalCode("33000"));
runScenario("Code postal trop court (3300)", () => validatePostalCode("3300"));
runScenario("Code postal invalide (33A00)", () => validatePostalCode("33A00"));

// --- Scénarios Identité ---
console.log("\n--- Tests Identité ---");
runScenario("Nom valide (Pierre)", () => validateIdentity("Pierre"));
runScenario("Nom composé (Jean-Pierre)", () => validateIdentity("Jean-Pierre"));
runScenario("Nom avec chiffres (Pierre123)", () => validateIdentity("Pierre123"));
runScenario("Injection XSS (<script>)", () => validateIdentity("<script>"));

// --- Scénarios Email ---
console.log("\n--- Tests Email ---");
runScenario("Email valide (test@example.com)", () => validateEmail("test@example.com"));
runScenario("Email invalide (test.com)", () => validateEmail("test.com"));

// --- Scénarios Ville ---
console.log("\n--- Tests Ville ---");
runScenario("Ville valide (Paris)", () => validateCity("Paris"));
runScenario("Ville composée (Aix-en-Provence)", () => validateCity("Aix-en-Provence"));
runScenario("Ville invalide (Paris75)", () => validateCity("Paris75"));

console.log("\n=== Fin des scénarios ===");