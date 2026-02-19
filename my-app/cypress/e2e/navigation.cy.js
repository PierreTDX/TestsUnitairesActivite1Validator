/**
 * @file navigation.cy.js
 * @description E2E tests for navigation and shared state management.
 * Covers nominal registration flow and error handling with state persistence checks.
 */
describe('Navigation & State Management Scenarios', () => {

    // Reset state before each test to ensure isolation
    beforeEach(() => {
        cy.clearLocalStorage();
    });

    it('Nominal Scenario: Valid user addition and persistence check', () => {
        // 1. Navigate to Home (/)
        cy.visit('/');

        // Verify "0 registered users" and empty list (users = [])
        cy.contains('No users registered yet').should('be.visible');
        cy.contains('registered user').should('not.exist');
        cy.get('.user-card').should('not.exist');

        // 2. Click/Navigate to Registration Form (/register)
        cy.contains('Go to Registration').click();
        cy.url().should('include', '/registration');

        // 3. Add a new valid user (Success)
        cy.get('[data-testid="firstName-input"]').type('Thomas');
        cy.get('[data-testid="lastName-input"]').type('Anderson');
        cy.get('[data-testid="email-input"]').type('neo@matrix.com');
        cy.get('[data-testid="birthDate-input"]').type('1990-01-01');
        cy.get('[data-testid="city-input"]').type('Zion');
        cy.get('[data-testid="postalCode-input"]').type('10101');

        // Submission
        cy.get('[data-testid="submit-button"]').click();

        // Verify success message
        cy.get('[data-testid="success-message"]').should('contain', 'Registration successful');

        // 4. Redirection or Navigation to Home
        cy.get('[data-testid="back-button"]').click();
        cy.url().should('eq', Cypress.config().baseUrl + '/#/');

        // 5. Verify "1 registered user" AND presence of new user in the list
        cy.contains('1 registered user').should('be.visible');
        cy.get('.user-card').should('have.length', 1);
        cy.contains('Thomas Anderson').should('be.visible');
        cy.contains('neo@matrix.com').should('be.visible');
    });

    it('Error Scenario: Invalid addition attempt and integrity check', () => {
        // Prerequisite: Simulate previous state (1 registered) by injecting data
        // into localStorage before loading the page.
        const existingUser = [{
            firstName: 'Morpheus',
            lastName: 'Nebuchadnezzar',
            email: 'morpheus@matrix.com',
            birthDate: '1960-01-01',
            city: 'Zion',
            postalCode: '10101',
            timestamp: new Date().toISOString()
        }];

        cy.window().then((win) => {
            win.localStorage.setItem('registrations', JSON.stringify(existingUser));
        });

        // 1. Navigate to Home (/) with pre-loaded state
        cy.visit('/');
        cy.contains('1 registered user').should('be.visible');
        cy.get('.user-card').should('have.length', 1);
        cy.contains('Morpheus').should('be.visible');

        // 2. Navigate to Registration Form
        cy.contains('Go to Registration').click();

        // 3. Invalid addition attempt (e.g., invalid email)
        cy.get('[data-testid="firstName-input"]').type('Agent');
        cy.get('[data-testid="lastName-input"]').type('Smith');
        cy.get('[data-testid="email-input"]').type('invalid-email'); // Invalid
        cy.get('[data-testid="email-input"]').blur(); // Trigger validation

        // Verify displayed error
        cy.get('[data-testid="email-error"]').should('be.visible');

        // Button must be disabled
        cy.get('[data-testid="submit-button"]').should('be.disabled');

        // 4. Return to Home
        cy.get('[data-testid="back-button"]').click();

        // 5. Verify "Still 1 registered user" and list unchanged
        cy.url().should('eq', Cypress.config().baseUrl + '/#/');
        cy.contains('1 registered user').should('be.visible');
        cy.get('.user-card').should('have.length', 1);
        cy.contains('Morpheus').should('be.visible');
        cy.contains('Agent Smith').should('not.exist');
    });
});