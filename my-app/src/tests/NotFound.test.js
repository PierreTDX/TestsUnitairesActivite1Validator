/**
 * @file NotFound.test.js
 * @description Integration tests for the NotFound component.
 * Verifies rendering of error messages and navigation link.
 */
import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import NotFound from '../pages/NotFound';

describe('NotFound Page Integration Tests', () => {

    /**
     * Helper to render with Router context (needed for <Link>).
     * Wraps the component in a MemoryRouter.
     * @param {React.ReactNode} component - The component to render.
     * @returns {Object} The render result.
     */
    const renderWithRouter = (component) => {
        return render(<MemoryRouter>{component}</MemoryRouter>);
    };

    test('renders 404 error code', () => {
        renderWithRouter(<NotFound />);
        expect(screen.getByText('404')).toBeInTheDocument();
    });

    test('renders error message', () => {
        renderWithRouter(<NotFound />);
        expect(screen.getByText(/Page Not Found/i)).toBeInTheDocument();
        expect(screen.getByText(/The page you are looking for does not exist/i)).toBeInTheDocument();
    });

    test('renders link to home page', () => {
        renderWithRouter(<NotFound />);

        const link = screen.getByTestId('home-button');
        expect(link).toBeInTheDocument();
        expect(link).toHaveAttribute('href', '/');
        expect(link).toHaveTextContent(/Back to Home/i);
    });
});