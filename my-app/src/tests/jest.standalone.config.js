/**
 * @file jest.standalone.config.js
 * @description Jest configuration for standalone execution.
 * Configures the test environment, coverage collection, and module mapping.
 */
module.exports = {
    testEnvironment: "jsdom",
    collectCoverageFrom: [
        "src/**/*.{js,jsx}",
        "!src/index.js",
        "!src/reportWebVitals.js",
        "!src/run-scenarios.js",
        "!src/setupTests.js"
    ],
    moduleNameMapper: {
        "\\.(css|less|scss|sass)$": "identity-obj-proxy",
        "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "jest-transform-stub"
    },
    transform: {
        "^.+\\.(js|jsx|ts|tsx)$": "babel-jest"
    }
};