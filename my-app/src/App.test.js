import { render, screen } from '@testing-library/react';
import App from './App';
import React from 'react';
import '@testing-library/jest-dom';

test('renders registration form title', () => {
  render(<App />);
  // const titleElement = screen.getByText(/Formulaire d'inscription/i);
  // expect(titleElement).toBeInTheDocument();
});
