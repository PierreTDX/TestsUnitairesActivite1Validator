/**
 * Custom Error class for validation errors with a code.
 */
export class ValidationError extends Error {
    constructor(message, code) {
        super(message);
        this.name = "ValidationError";
        this.code = code;
    }
}

/**
 * Calculate a person's age in years.
 *
 * @param {object} p An object representing a person, implementing a birth Date parameter.
 * @return {number} The age in years of p.
 */
export function calculateAge(p) {
    if (!p) {
        throw new ValidationError("missing param p", "MISSING_PARAM")
    }
    if (typeof p !== 'object') {
        throw new ValidationError("param p must be an object", "INVALID_TYPE")
    }
    if (!p.birth) {
        throw new ValidationError("missing param p.birth", "MISSING_BIRTH")
    }
    if (!(p.birth instanceof Date)) {
        throw new ValidationError("p.birth must be a Date object", "INVALID_BIRTH_TYPE")
    }
    if (isNaN(p.birth)) {
        throw new ValidationError("p.birth is an invalid Date", "INVALID_DATE")
    }

    const today = new Date();
    let age = today.getFullYear() - p.birth.getFullYear();
    const m = today.getMonth() - p.birth.getMonth();

    if (m < 0 || (m === 0 && today.getDate() < p.birth.getDate())) {
        age--;
    }
    if (age < 18) {
        throw new ValidationError("Age must be at least 18 years old.", "MINOR")
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
        throw new ValidationError("missing param code", "MISSING_CODE")
    }
    if (typeof code !== 'string') {
        throw new ValidationError("code must be a string", "INVALID_TYPE")
    }
    if (!/^\d{5}$/.test(code)) {
        throw new ValidationError("code must be 5 digits", "INVALID_FORMAT")
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
        throw new ValidationError("missing param name", "MISSING_NAME")
    }
    if (typeof name !== 'string') {
        throw new ValidationError("name must be a string", "INVALID_TYPE")
    }
    if (!/^[a-zA-Z\u00C0-\u00FF-]+$/.test(name)) {
        throw new ValidationError("name must only contain letters, accents and hyphens", "INVALID_FORMAT")
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
        throw new ValidationError("missing param email", "MISSING_EMAIL")
    }
    if (typeof email !== 'string') {
        throw new ValidationError("email must be a string", "INVALID_TYPE")
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        throw new ValidationError("email is invalid", "INVALID_FORMAT")
    }
    return true;
}