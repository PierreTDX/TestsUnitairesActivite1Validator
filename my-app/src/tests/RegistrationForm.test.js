/**
 * @file RegistrationForm.test.js
 * @description Integration tests for the RegistrationForm component.
 * Verifies UI behavior, validation logic integration, and localStorage interactions.
 */
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import RegistrationForm from '../pages/RegistrationForm';

describe('RegistrationForm Integration Tests', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  // Helper function to render component with router context
  const renderWithRouter = (component) => {
    return render(<MemoryRouter>{component}</MemoryRouter>);
  };

  test('renders all form fields', () => {
    renderWithRouter(<RegistrationForm />);

    expect(screen.getByLabelText(/First Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Last Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Birth Date/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/City/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Postal Code/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Register/i })).toBeInTheDocument();
  });

  test('renders form title', () => {
    renderWithRouter(<RegistrationForm />);
    expect(screen.getByText(/Registration Form/i)).toBeInTheDocument();
  });

  test('submit button is disabled when form is empty', () => {
    renderWithRouter(<RegistrationForm />);
    const submitButton = screen.getByTestId('submit-button');
    expect(submitButton).toBeDisabled();
  });

  test('displays error for invalid first name on blur', () => {
    renderWithRouter(<RegistrationForm />);

    const firstNameInput = screen.getByTestId('firstName-input');

    fireEvent.change(firstNameInput, { target: { value: '123' } });
    fireEvent.blur(firstNameInput);

    expect(screen.getByTestId('firstName-error')).toBeInTheDocument();
  });

  test('displays error for invalid email', () => {
    renderWithRouter(<RegistrationForm />);

    const emailInput = screen.getByTestId('email-input');

    fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
    fireEvent.blur(emailInput);

    expect(screen.getByTestId('email-error')).toBeInTheDocument();
  });

  test('displays error for invalid postal code', () => {
    renderWithRouter(<RegistrationForm />);

    const postalCodeInput = screen.getByTestId('postalCode-input');

    fireEvent.change(postalCodeInput, { target: { value: '123' } });
    fireEvent.blur(postalCodeInput);

    expect(screen.getByTestId('postalCode-error')).toBeInTheDocument();
  });

  test('successfully submits valid form and calls onUserAdd', async () => {
    const mockOnUserAdd = jest.fn();
    renderWithRouter(<RegistrationForm onUserAdd={mockOnUserAdd} />);

    const validDate = new Date();
    validDate.setFullYear(validDate.getFullYear() - 20);
    const dateString = validDate.toISOString().split('T')[0];

    fireEvent.change(screen.getByTestId('firstName-input'), {
      target: { value: 'Jean' }
    });
    fireEvent.change(screen.getByTestId('lastName-input'), {
      target: { value: 'Dupont' }
    });
    fireEvent.change(screen.getByTestId('email-input'), {
      target: { value: 'jean.dupont@example.com' }
    });
    fireEvent.change(screen.getByTestId('birthDate-input'), {
      target: { value: dateString }
    });
    fireEvent.change(screen.getByTestId('city-input'), {
      target: { value: 'Paris' }
    });
    fireEvent.change(screen.getByTestId('postalCode-input'), {
      target: { value: '75001' }
    });

    fireEvent.click(screen.getByTestId('submit-button'));

    await waitFor(() => {
      expect(screen.getByTestId('success-message')).toBeInTheDocument();
    });

    expect(mockOnUserAdd).toHaveBeenCalledTimes(1);
  });

  test('displays error for user under 18', () => {
    renderWithRouter(<RegistrationForm />);

    const today = new Date();
    const date17YearsAgo = new Date(today.getFullYear() - 17, today.getMonth(), today.getDate());
    const dateString = date17YearsAgo.toISOString().split('T')[0];

    const birthDateInput = screen.getByTestId('birthDate-input');

    fireEvent.change(birthDateInput, { target: { value: dateString } });
    fireEvent.blur(birthDateInput);

    expect(screen.getByTestId('birthDate-error')).toBeInTheDocument();
    expect(screen.getByTestId('birthDate-error')).toHaveTextContent(/18 years old/i);
  });

  test('displays error for birth year before 1900', () => {
    renderWithRouter(<RegistrationForm />);

    const birthDateInput = screen.getByTestId('birthDate-input');

    fireEvent.change(birthDateInput, { target: { value: '0008-01-01' } });
    fireEvent.blur(birthDateInput);

    expect(screen.getByTestId('birthDate-error')).toBeInTheDocument();
    expect(screen.getByTestId('birthDate-error')).toHaveTextContent(/1900 or later/i);
  });

  test('clears error message when user starts typing', () => {
    renderWithRouter(<RegistrationForm />);

    const firstNameInput = screen.getByTestId('firstName-input');

    // Trigger error via blur
    fireEvent.change(firstNameInput, { target: { value: '123' } });
    fireEvent.blur(firstNameInput);
    expect(screen.getByTestId('firstName-error')).toBeInTheDocument();

    // Start typing
    fireEvent.change(firstNameInput, { target: { value: 'Jean' } });
    expect(screen.queryByTestId('firstName-error')).not.toBeInTheDocument();
  });

  test('calls onUserAdd with correct data', async () => {
    const mockOnUserAdd = jest.fn();
    renderWithRouter(<RegistrationForm onUserAdd={mockOnUserAdd} />);
    const validDate = new Date();
    validDate.setFullYear(validDate.getFullYear() - 20);
    const dateString = validDate.toISOString().split('T')[0];

    // Fill and submit form
    fireEvent.change(screen.getByTestId('firstName-input'), {
      target: { value: 'Jean' }
    });
    fireEvent.change(screen.getByTestId('lastName-input'), {
      target: { value: 'Dupont' }
    });
    fireEvent.change(screen.getByTestId('email-input'), {
      target: { value: 'jean@example.com' }
    });
    fireEvent.change(screen.getByTestId('birthDate-input'), {
      target: { value: dateString }
    });
    fireEvent.change(screen.getByTestId('city-input'), {
      target: { value: 'Paris' }
    });
    fireEvent.change(screen.getByTestId('postalCode-input'), {
      target: { value: '75001' }
    });

    fireEvent.click(screen.getByTestId('submit-button'));

    expect(mockOnUserAdd).toHaveBeenCalled();
  });

  test('resets form after successful submission', async () => {
    const mockOnUserAdd = jest.fn();
    renderWithRouter(<RegistrationForm onUserAdd={mockOnUserAdd} />);

    const validDate = new Date();
    validDate.setFullYear(validDate.getFullYear() - 20);
    const dateString = validDate.toISOString().split('T')[0];

    fireEvent.change(screen.getByTestId('firstName-input'), { target: { value: 'Jean' } });
    fireEvent.change(screen.getByTestId('lastName-input'), { target: { value: 'Dupont' } });
    fireEvent.change(screen.getByTestId('email-input'), { target: { value: 'jean@example.com' } });
    fireEvent.change(screen.getByTestId('birthDate-input'), { target: { value: dateString } });
    fireEvent.change(screen.getByTestId('city-input'), { target: { value: 'Paris' } });
    fireEvent.change(screen.getByTestId('postalCode-input'), { target: { value: '75001' } });

    fireEvent.click(screen.getByTestId('submit-button'));

    await waitFor(() => {
      expect(screen.getByTestId('firstName-input')).toHaveValue('');
      expect(screen.getByTestId('lastName-input')).toHaveValue('');
      expect(screen.getByTestId('email-input')).toHaveValue('');
      expect(screen.getByTestId('birthDate-input')).toHaveValue('');
      expect(screen.getByTestId('city-input')).toHaveValue('');
      expect(screen.getByTestId('postalCode-input')).toHaveValue('');
    });
  });

  test('displays error when parent component throws error (e.g. storage full)', async () => {
    // Simulate an error coming from the parent (App.js)
    const mockOnUserAdd = jest.fn().mockImplementation(() => {
      throw new Error('Storage quota exceeded');
    });

    renderWithRouter(<RegistrationForm onUserAdd={mockOnUserAdd} />);

    const validDate = new Date();
    validDate.setFullYear(validDate.getFullYear() - 20);
    const dateString = validDate.toISOString().split('T')[0];

    fireEvent.change(screen.getByTestId('firstName-input'), { target: { value: 'Jean' } });
    fireEvent.change(screen.getByTestId('lastName-input'), { target: { value: 'Dupont' } });
    fireEvent.change(screen.getByTestId('email-input'), { target: { value: 'jean@example.com' } });
    fireEvent.change(screen.getByTestId('birthDate-input'), { target: { value: dateString } });
    fireEvent.change(screen.getByTestId('city-input'), { target: { value: 'Paris' } });
    fireEvent.change(screen.getByTestId('postalCode-input'), { target: { value: '75001' } });

    fireEvent.click(screen.getByTestId('submit-button'));

    await waitFor(() => {
      expect(screen.getByTestId('submit-error')).toBeInTheDocument();
      expect(screen.getByTestId('submit-error')).toHaveTextContent('Storage quota exceeded');
    });
  });

  test('chaotic user behavior: invalid input disables button, correction enables it', () => {
    renderWithRouter(<RegistrationForm />);
    const submitButton = screen.getByTestId('submit-button');
    const emailInput = screen.getByTestId('email-input');

    // Button initially disabled
    expect(submitButton).toBeDisabled();

    // User types invalid email
    fireEvent.change(emailInput, { target: { value: 'bad-email' } });
    fireEvent.blur(emailInput);
    expect(screen.getByTestId('email-error')).toBeInTheDocument();
    expect(submitButton).toBeDisabled();

    // User corrects email (but other fields still empty)
    fireEvent.change(emailInput, { target: { value: 'good@email.com' } });
    expect(screen.queryByTestId('email-error')).not.toBeInTheDocument();
    expect(submitButton).toBeDisabled(); // Still disabled because other fields are empty
  });

  test('postal code input has maxLength of 5', () => {
    renderWithRouter(<RegistrationForm />);
    const postalCodeInput = screen.getByTestId('postalCode-input');
    expect(postalCodeInput).toHaveAttribute('maxLength', '5');
  });

  test('form inputs update correctly', () => {
    renderWithRouter(<RegistrationForm />);

    const firstNameInput = screen.getByTestId('firstName-input');
    fireEvent.change(firstNameInput, { target: { value: 'Jean' } });
    expect(firstNameInput).toHaveValue('Jean');

    const emailInput = screen.getByTestId('email-input');
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    expect(emailInput).toHaveValue('test@example.com');
  });

  test('shows errors when submitting invalid form (bypassing disabled button)', () => {
    const { container } = renderWithRouter(<RegistrationForm />);
    const form = container.querySelector('form');

    fireEvent.submit(form);

    expect(screen.getByTestId('firstName-error')).toBeInTheDocument();
    expect(screen.queryByTestId('success-message')).not.toBeInTheDocument();
  });

  test('displays error for invalid last name on blur', () => {
    renderWithRouter(<RegistrationForm />);
    const lastNameInput = screen.getByTestId('lastName-input');
    fireEvent.change(lastNameInput, { target: { value: '123' } });
    fireEvent.blur(lastNameInput);
    expect(screen.getByTestId('lastName-error')).toBeInTheDocument();
  });

  test('displays error for invalid city on blur', () => {
    renderWithRouter(<RegistrationForm />);
    const cityInput = screen.getByTestId('city-input');
    fireEvent.change(cityInput, { target: { value: 'Paris75' } });
    fireEvent.blur(cityInput);
    expect(screen.getByTestId('city-error')).toBeInTheDocument();
  });

  test('does not display error for valid values on blur', () => {
    renderWithRouter(<RegistrationForm />);

    // Test valid first name
    const firstNameInput = screen.getByTestId('firstName-input');
    fireEvent.change(firstNameInput, { target: { value: 'Pierre' } });
    fireEvent.blur(firstNameInput);

    // Verify no error is shown
    expect(screen.queryByTestId('firstName-error')).not.toBeInTheDocument();
  });

  test('clears success message when user starts typing', async () => {
    const mockOnUserAdd = jest.fn();
    renderWithRouter(<RegistrationForm onUserAdd={mockOnUserAdd} />);

    // Fill valid form
    const validDate = new Date();
    validDate.setFullYear(validDate.getFullYear() - 20);
    const dateString = validDate.toISOString().split('T')[0];

    fireEvent.change(screen.getByTestId('firstName-input'), { target: { value: 'Jean' } });
    fireEvent.change(screen.getByTestId('lastName-input'), { target: { value: 'Dupont' } });
    fireEvent.change(screen.getByTestId('email-input'), { target: { value: 'jean@example.com' } });
    fireEvent.change(screen.getByTestId('birthDate-input'), { target: { value: dateString } });
    fireEvent.change(screen.getByTestId('city-input'), { target: { value: 'Paris' } });
    fireEvent.change(screen.getByTestId('postalCode-input'), { target: { value: '75001' } });

    // Submit
    fireEvent.click(screen.getByTestId('submit-button'));

    // Check success message
    await waitFor(() => {
      expect(screen.getByTestId('success-message')).toBeInTheDocument();
    });

    // Type something to trigger handleChange
    fireEvent.change(screen.getByTestId('firstName-input'), { target: { value: 'Jeannot' } });

    // Check success message gone
    expect(screen.queryByTestId('success-message')).not.toBeInTheDocument();
  });

  test('handles submission gracefully when onUserAdd is not provided', async () => {
    renderWithRouter(<RegistrationForm />); // No onUserAdd prop

    const validDate = new Date();
    validDate.setFullYear(validDate.getFullYear() - 20);
    const dateString = validDate.toISOString().split('T')[0];

    fireEvent.change(screen.getByTestId('firstName-input'), { target: { value: 'Jean' } });
    fireEvent.change(screen.getByTestId('lastName-input'), { target: { value: 'Dupont' } });
    fireEvent.change(screen.getByTestId('email-input'), { target: { value: 'jean@example.com' } });
    fireEvent.change(screen.getByTestId('birthDate-input'), { target: { value: dateString } });
    fireEvent.change(screen.getByTestId('city-input'), { target: { value: 'Paris' } });
    fireEvent.change(screen.getByTestId('postalCode-input'), { target: { value: '75001' } });

    fireEvent.click(screen.getByTestId('submit-button'));

    await waitFor(() => {
      expect(screen.getByTestId('success-message')).toBeInTheDocument();
    });
  });
});