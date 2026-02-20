/**
 * @file App.test.js
 * @description Integration tests for the App component.
 * Verifies routing logic, initial rendering, and full user flows.
 */
import { render, screen, fireEvent, waitFor, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from '../App';
import React from 'react';
import '@testing-library/jest-dom';
import axios from 'axios';

// Mock axios globally for this file
jest.mock('axios');

describe('App Integration Tests', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders home page by default', async () => {
    // Mock successful API call with data to ensure we can wait for it
    axios.get.mockResolvedValue({ data: [{ firstName: 'TestUser', lastName: 'Test', email: 'test@test.com', timestamp: new Date().toISOString() }] });

    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    );

    // Wait for the user to appear. This ensures useEffect completed and state updated.
    expect(await screen.findByText('TestUser Test')).toBeInTheDocument();

    // Ensure loading is gone
    await waitFor(() => expect(screen.queryByTestId('app-loading-toast')).not.toBeInTheDocument());
  });

  test('navigates to registration page', async () => {
    axios.get.mockResolvedValue({ data: [] });

    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    );

    // Wait for home to load
    await screen.findByText(/Registered Users/i);

    // Wait for initial loading to finish before navigating
    await waitFor(() => expect(screen.queryByTestId('app-loading-toast')).not.toBeInTheDocument());

    fireEvent.click(screen.getByText(/Go to Registration/i));
    expect(screen.getByText(/Registration Form/i)).toBeInTheDocument();
  });

  test('renders registration page directly on specific route', async () => {
    axios.get.mockResolvedValue({ data: [] });

    render(
      <MemoryRouter initialEntries={['/registration']}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText(/Registration Form/i)).toBeInTheDocument();

    // Wait for initial App load to finish to avoid act warnings
    await waitFor(() => expect(screen.queryByTestId('app-loading-toast')).not.toBeInTheDocument());
  });

  test('handles error when loading users gracefully', async () => {
    // Mock console.error to avoid polluting test output
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => { });

    // Mock API failure
    axios.get.mockRejectedValue(new Error('Network Error'));

    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );

    // Verify error message in UI
    expect(await screen.findByText(/Failed to load users from API/i)).toBeInTheDocument();

    // Verify error was logged
    expect(consoleSpy).toHaveBeenCalledWith("Error loading initial data", expect.any(Error));

    // Verify Home still renders (title)
    expect(screen.getByText(/Registered Users/i)).toBeInTheDocument();

    consoleSpy.mockRestore();

    // Wait for loading to finish
    await waitFor(() => expect(screen.queryByTestId('app-loading-toast')).not.toBeInTheDocument());
  });

  test('displays server error when API returns 500 on initial load', async () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => { });
    // Mock API failure with 500 status
    axios.get.mockRejectedValue({ response: { status: 500 } });

    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    );

    // Verify specific server error message
    expect(await screen.findByText(/Server is down/i)).toBeInTheDocument();

    // Wait for loading to finish
    await waitFor(() => expect(screen.queryByTestId('app-loading-toast')).not.toBeInTheDocument());
    consoleSpy.mockRestore();
  });

  test('closes global error toast when close button is clicked', async () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => { });
    // Mock API failure with 500 status on initial load
    axios.get.mockRejectedValue({ response: { status: 500 } });

    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    );

    const errorToast = await screen.findByTestId('global-error-toast');
    const closeButton = within(errorToast).getByRole('button');
    fireEvent.click(closeButton);

    expect(errorToast).not.toBeInTheDocument();

    // Wait for loading to finish
    await waitFor(() => expect(screen.queryByTestId('app-loading-toast')).not.toBeInTheDocument());
    consoleSpy.mockRestore();
  });

  test('full registration flow updates user list', async () => {
    // 1. Initial load (empty)
    axios.get.mockResolvedValueOnce({ data: [] });
    // 2. Post response
    axios.post.mockResolvedValueOnce({ data: { id: 101 } });

    render(
      <MemoryRouter initialEntries={['/registration']}>
        <App />
      </MemoryRouter>
    );

    // Wait for initial load
    await waitFor(() => expect(screen.queryByTestId('app-loading-toast')).not.toBeInTheDocument());

    // Fill form with valid data
    fireEvent.change(screen.getByTestId('firstName-input'), { target: { value: 'New' } });
    fireEvent.change(screen.getByTestId('lastName-input'), { target: { value: 'User' } });
    fireEvent.change(screen.getByTestId('email-input'), { target: { value: 'new@user.com' } });
    fireEvent.change(screen.getByTestId('birthDate-input'), { target: { value: '1990-01-01' } });
    fireEvent.change(screen.getByTestId('city-input'), { target: { value: 'City' } });
    fireEvent.change(screen.getByTestId('postalCode-input'), { target: { value: '12345' } });

    // Submit
    fireEvent.click(screen.getByTestId('submit-button'));

    // Wait for loading to finish FIRST
    await waitFor(() => expect(screen.queryByText(/Registration in progress.../i)).not.toBeInTheDocument());

    // Then check success message
    expect(screen.getByText(/Registration successful!/i)).toBeInTheDocument();

    // Navigate back to home manually
    fireEvent.click(screen.getByText(/Back to Home/i));

    // Verify redirection to Home
    expect(screen.getByText(/Registered Users/i)).toBeInTheDocument();

    // Verify new user is in the list (optimistic update or state update in App.js)
    expect(screen.getByText('New User')).toBeInTheDocument();
  });

  test('renders 404 page for unknown routes', async () => {
    axios.get.mockResolvedValue({ data: [] });

    render(
      <MemoryRouter initialEntries={['/unknown-route']}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText('404')).toBeInTheDocument();
    expect(screen.getByText(/Page Not Found/i)).toBeInTheDocument();

    // Wait for initial load
    await waitFor(() => expect(screen.queryByTestId('app-loading-toast')).not.toBeInTheDocument());
  });

  test('displays specific error when API returns 400 (Email exists)', async () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => { });
    // 1. Initial load
    axios.get.mockResolvedValue({ data: [] });
    // 2. Post response failure (400)
    axios.post.mockRejectedValue({ response: { status: 400 } });

    render(
      <MemoryRouter initialEntries={['/registration']}>
        <App />
      </MemoryRouter>
    );

    // Wait for initial load
    await waitFor(() => expect(screen.queryByTestId('app-loading-toast')).not.toBeInTheDocument());

    // Fill form
    fireEvent.change(screen.getByTestId('firstName-input'), { target: { value: 'Jean' } });
    fireEvent.change(screen.getByTestId('lastName-input'), { target: { value: 'Dupont' } });
    fireEvent.change(screen.getByTestId('email-input'), { target: { value: 'duplicate@test.com' } });
    fireEvent.change(screen.getByTestId('birthDate-input'), { target: { value: '1990-01-01' } });
    fireEvent.change(screen.getByTestId('city-input'), { target: { value: 'Paris' } });
    fireEvent.change(screen.getByTestId('postalCode-input'), { target: { value: '75001' } });

    fireEvent.click(screen.getByTestId('submit-button'));

    await waitFor(() => {
      expect(screen.queryByText(/Registration in progress.../i)).not.toBeInTheDocument();
      expect(screen.getByTestId('submit-error')).toHaveTextContent('Email already exists');
    });
    consoleSpy.mockRestore();
  });

  test('displays server error when API returns 500', async () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => { });
    axios.get.mockResolvedValue({ data: [] });
    axios.post.mockRejectedValue({ response: { status: 500 } });

    render(
      <MemoryRouter initialEntries={['/registration']}>
        <App />
      </MemoryRouter>
    );

    // Wait for initial load
    await waitFor(() => expect(screen.queryByTestId('app-loading-toast')).not.toBeInTheDocument());

    // Fill minimal valid form...
    fireEvent.change(screen.getByTestId('firstName-input'), { target: { value: 'Jean' } });
    // ... (supposons que les autres champs sont remplis ou optionnels pour simplifier le test, sinon copier le bloc du dessus)
    // Pour la brièveté ici, je reprends la logique de remplissage complet :
    fireEvent.change(screen.getByTestId('lastName-input'), { target: { value: 'Dupont' } });
    fireEvent.change(screen.getByTestId('email-input'), { target: { value: 'test@test.com' } });
    fireEvent.change(screen.getByTestId('birthDate-input'), { target: { value: '1990-01-01' } });
    fireEvent.change(screen.getByTestId('city-input'), { target: { value: 'Paris' } });
    fireEvent.change(screen.getByTestId('postalCode-input'), { target: { value: '75001' } });

    fireEvent.click(screen.getByTestId('submit-button'));

    await waitFor(() => {
      expect(screen.queryByText(/Registration in progress.../i)).not.toBeInTheDocument();
      expect(screen.getByTestId('submit-error')).toHaveTextContent('Server is down');
    });
    consoleSpy.mockRestore();
  });

  test('displays generic error when API returns unknown error (Network Error)', async () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => { });
    axios.get.mockResolvedValue({ data: [] });
    axios.post.mockRejectedValue(new Error('Network Error'));

    render(
      <MemoryRouter initialEntries={['/registration']}>
        <App />
      </MemoryRouter>
    );

    // Wait for initial load
    await waitFor(() => expect(screen.queryByTestId('app-loading-toast')).not.toBeInTheDocument());

    fireEvent.change(screen.getByTestId('firstName-input'), { target: { value: 'Jean' } });
    fireEvent.change(screen.getByTestId('lastName-input'), { target: { value: 'Dupont' } });
    fireEvent.change(screen.getByTestId('email-input'), { target: { value: 'generic@test.com' } });
    fireEvent.change(screen.getByTestId('birthDate-input'), { target: { value: '1990-01-01' } });
    fireEvent.change(screen.getByTestId('city-input'), { target: { value: 'Paris' } });
    fireEvent.change(screen.getByTestId('postalCode-input'), { target: { value: '75001' } });

    fireEvent.click(screen.getByTestId('submit-button'));

    await waitFor(() => {
      expect(screen.queryByText(/Registration in progress.../i)).not.toBeInTheDocument();
      expect(screen.getByTestId('submit-error')).toHaveTextContent('Failed to save user to API');
    });
    consoleSpy.mockRestore();
  });

  test('displays generic error when API returns unhandled status code', async () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => { });
    axios.get.mockResolvedValue({ data: [] });
    axios.post.mockRejectedValue({ response: { status: 418 } });

    render(
      <MemoryRouter initialEntries={['/registration']}>
        <App />
      </MemoryRouter>
    );

    // Wait for initial load
    await waitFor(() => expect(screen.queryByTestId('app-loading-toast')).not.toBeInTheDocument());

    fireEvent.change(screen.getByTestId('firstName-input'), { target: { value: 'Jean' } });
    fireEvent.change(screen.getByTestId('lastName-input'), { target: { value: 'Dupont' } });
    fireEvent.change(screen.getByTestId('email-input'), { target: { value: 'teapot@test.com' } });
    fireEvent.change(screen.getByTestId('birthDate-input'), { target: { value: '1990-01-01' } });
    fireEvent.change(screen.getByTestId('city-input'), { target: { value: 'Paris' } });
    fireEvent.change(screen.getByTestId('postalCode-input'), { target: { value: '75001' } });

    fireEvent.click(screen.getByTestId('submit-button'));

    await waitFor(() => {
      expect(screen.queryByText(/Registration in progress.../i)).not.toBeInTheDocument();
      expect(screen.getByTestId('submit-error')).toHaveTextContent('Failed to save user to API');
    });
    consoleSpy.mockRestore();
  });
});
