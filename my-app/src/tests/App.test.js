import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from '../App';
import React from 'react';
import '@testing-library/jest-dom';

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
