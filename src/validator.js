/**
 * Calculate a person's age in years.
 *
 * @param {object} p An object representing a person, implementing a birth Date parameter.
 * @return {number} The age in years of p.
 */
export function calculateAge(p) {
    if (!p) {
        throw new Error("missing param p")
    }
    if (typeof p !== 'object') {
        throw new Error("param p must be an object")
    }
    if (!p.birth) {
        throw new Error("missing param p.birth")
    }
    if (!(p.birth instanceof Date)) {
        throw new Error("p.birth must be a Date object")
    }
    if (isNaN(p.birth)) {
        throw new Error("p.birth is an invalid Date")
    }

    const today = new Date();
    let age = today.getFullYear() - p.birth.getFullYear();
    const m = today.getMonth() - p.birth.getMonth();

    if (m < 0 || (m === 0 && today.getDate() < p.birth.getDate())) {
        age--;
    }
    if (age < 18) {
        throw new Error("Age must be at least 18 years old.")
    }
    return age;
}

/**
 * Validate a french postal code.
 *
 * @param {string} code The postal code to check.
 * @return {boolean} True if the postal code is valid.
 */
export function validatePostalCode(code) {
    if (!code) {
        throw new Error("missing param code")
    }
    if (typeof code !== 'string') {
        throw new Error("code must be a string")
    }
    if (!/^\d{5}$/.test(code)) {
        throw new Error("code must be 5 digits")
    }
    return true;
}

/**
 * Validate a person's identity (name/surname).
 *
 * @param {string} name The name to check.
 * @return {boolean} True if the name is valid.
 */
export function validateIdentity(name) {
    if (!name) {
        throw new Error("missing param name")
    }
    if (typeof name !== 'string') {
        throw new Error("name must be a string")
    }
    if (!/^[a-zA-Z\u00C0-\u00FF-]+$/.test(name)) {
        throw new Error("name must only contain letters, accents and hyphens")
    }
    return true;
}

/**
 * Validate an email address.
 *
 * @param {string} email The email to check.
 * @return {boolean} True if the email is valid.
 */
export function validateEmail(email) {
    if (!email) {
        throw new Error("missing param email")
    }
    if (typeof email !== 'string') {
        throw new Error("email must be a string")
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        throw new Error("email is invalid")
    }
    return true;
}