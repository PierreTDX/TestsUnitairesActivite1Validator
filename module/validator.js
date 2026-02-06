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
    let dateDiff = new Date(Date.now() - p.birth.getTime())
    let age = Math.abs(dateDiff.getUTCFullYear() - 1970);
    return age;
}

let loise = {
    birth: new Date("11/07/1991")
}
console.log(calculateAge(loise))