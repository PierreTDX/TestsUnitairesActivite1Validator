import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from '../App';
import React from 'react';
import '@testing-library/jest-dom';
import * as validator from '../utils/validator';

test('renders home page by default', () => {
  render(
    <MemoryRouter initialEntries={['/']}>
      <App />
    </MemoryRouter>
  );
  const titleElement = screen.getByText(/Registered Users/i);
  expect(titleElement).toBeInTheDocument();
});

test('navigates to registration page', () => {
  render(
    <MemoryRouter initialEntries={['/']}>
      <App />
    </MemoryRouter>
  );
  fireEvent.click(screen.getByText(/Go to Registration/i));
  expect(screen.getByText(/Registration Form/i)).toBeInTheDocument();
});

test('renders registration page directly on specific route', () => {
  render(
    <MemoryRouter initialEntries={['/registration']}>
      <App />
    </MemoryRouter>
  );
  expect(screen.getByText(/Registration Form/i)).toBeInTheDocument();
});

test('handles error when loading users gracefully', () => {
  // Mock console.error to avoid polluting test output
  const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => { });

  // Mock getFromLocalStorage to throw an error
  jest.spyOn(validator, 'getFromLocalStorage').mockImplementation(() => {
    throw new Error('Storage access denied');
  });

  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>
  );

  // Verify error was logged (message matches App.js) and component didn't crash
  expect(consoleSpy).toHaveBeenCalledWith("Error loading initial data", expect.any(Error));
  expect(screen.getByText(/Registered Users/i)).toBeInTheDocument();

  // Cleanup
  consoleSpy.mockRestore();
  jest.restoreAllMocks();
});

test('full registration flow updates user list', async () => {
  localStorage.clear();

  render(
    <MemoryRouter initialEntries={['/registration']}>
      <App />
    </MemoryRouter>
  );

  // Fill form with valid data
  fireEvent.change(screen.getByTestId('firstName-input'), { target: { value: 'New' } });
  fireEvent.change(screen.getByTestId('lastName-input'), { target: { value: 'User' } });
  fireEvent.change(screen.getByTestId('email-input'), { target: { value: 'new@user.com' } });
  fireEvent.change(screen.getByTestId('birthDate-input'), { target: { value: '1990-01-01' } });
  fireEvent.change(screen.getByTestId('city-input'), { target: { value: 'City' } });
  fireEvent.change(screen.getByTestId('postalCode-input'), { target: { value: '12345' } });

  // Submit
  fireEvent.click(screen.getByTestId('submit-button'));

  // Wait for success message
  await waitFor(() => expect(screen.getByText(/Registration successful!/i)).toBeInTheDocument());

  // Navigate back to home manually
  fireEvent.click(screen.getByText(/Back to Home/i));

  // Verify redirection to Home and presence of new user
  expect(screen.getByText(/Registered Users/i)).toBeInTheDocument();
  expect(screen.getByText('New User')).toBeInTheDocument();
});
