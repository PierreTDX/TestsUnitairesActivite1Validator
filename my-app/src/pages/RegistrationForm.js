import React, { useState } from 'react';
import { validateIdentity, validateEmail, validatePostalCode, validateCity, calculateAge, saveToLocalStorage } from '../utils/validator.js';
import '../styles/RegistrationForm.css';

const RegistrationForm = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        birthDate: '',
        city: '',
        postalCode: ''
    });

    const [errors, setErrors] = useState({});
    const [successMessage, setSuccessMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        // Clear error for this field when user starts typing
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }

        // Clear success message when user starts typing
        if (successMessage) {
            setSuccessMessage('');
        }
    };

    const handleBlur = (e) => {
        const { name, value } = e.target;
        let errorMsg = '';
        try {
            if (name === 'firstName') validateIdentity(value);
            if (name === 'lastName') validateIdentity(value);
            if (name === 'email') validateEmail(value);
            if (name === 'postalCode') validatePostalCode(value);
            if (name === 'city') validateCity(value);
            if (name === 'birthDate') calculateAge({ birth: new Date(value) });
        } catch (e) {
            errorMsg = e.message;
        }

        if (errorMsg) {
            setErrors(prev => ({ ...prev, [name]: errorMsg }));
        }
    };

    // Check if form is valid for disabling the button
    const isFormValid = () => {
        const { isValid } = validateForm(formData);
        return isValid;
    };

    const validateForm = (data) => {
        const errors = {};

        try {
            validateIdentity(data.firstName);
        } catch (e) {
            errors.firstName = e.message;
        }

        try {
            validateIdentity(data.lastName);
        } catch (e) {
            errors.lastName = e.message;
        }

        try {
            validateEmail(data.email);
        } catch (e) {
            errors.email = e.message;
        }

        try {
            validatePostalCode(data.postalCode);
        } catch (e) {
            errors.postalCode = e.message;
        }

        try {
            calculateAge({ birth: new Date(data.birthDate) });
        } catch (e) {
            errors.birthDate = e.message;
        }

        try {
            validateCity(data.city);
        } catch (e) {
            errors.city = e.message;
        }

        return { isValid: Object.keys(errors).length === 0, errors };
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const validation = validateForm(formData);

        if (validation.isValid) {
            try {
                saveToLocalStorage(formData);
                setSuccessMessage('Registration successful!');
                setErrors({});
                // Reset form
                setFormData({
                    firstName: '',
                    lastName: '',
                    email: '',
                    birthDate: '',
                    city: '',
                    postalCode: ''
                });
            } catch (e) {
                setErrors({ submit: e.message });
            }
        } else {
            setErrors(validation.errors);
            setSuccessMessage('');
        }
    };

    return (
        <div className="registration-form-container">
            <h1>Registration Form</h1>

            {successMessage && (
                <div className="success-message" data-testid="success-message">
                    {successMessage}
                </div>
            )}

            <form onSubmit={handleSubmit} className="registration-form">
                <div className="form-group">
                    <label htmlFor="firstName">First Name *</label>
                    <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={errors.firstName ? 'error' : ''}
                        data-testid="firstName-input"
                    />
                    {errors.firstName && (
                        <span className="error-message" data-testid="firstName-error">
                            {errors.firstName}
                        </span>
                    )}
                </div>

                <div className="form-group">
                    <label htmlFor="lastName">Last Name *</label>
                    <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={errors.lastName ? 'error' : ''}
                        data-testid="lastName-input"
                    />
                    {errors.lastName && (
                        <span className="error-message" data-testid="lastName-error">
                            {errors.lastName}
                        </span>
                    )}
                </div>

                <div className="form-group">
                    <label htmlFor="email">Email *</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={errors.email ? 'error' : ''}
                        data-testid="email-input"
                    />
                    {errors.email && (
                        <span className="error-message" data-testid="email-error">
                            {errors.email}
                        </span>
                    )}
                </div>

                <div className="form-group">
                    <label htmlFor="birthDate">Birth Date *</label>
                    <input
                        type="date"
                        id="birthDate"
                        name="birthDate"
                        value={formData.birthDate}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={errors.birthDate ? 'error' : ''}
                        data-testid="birthDate-input"
                    />
                    {errors.birthDate && (
                        <span className="error-message" data-testid="birthDate-error">
                            {errors.birthDate}
                        </span>
                    )}
                </div>

                <div className="form-group">
                    <label htmlFor="city">City *</label>
                    <input
                        type="text"
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={errors.city ? 'error' : ''}
                        data-testid="city-input"
                    />
                    {errors.city && (
                        <span className="error-message" data-testid="city-error">
                            {errors.city}
                        </span>
                    )}
                </div>

                <div className="form-group">
                    <label htmlFor="postalCode">Postal Code *</label>
                    <input
                        type="text"
                        id="postalCode"
                        name="postalCode"
                        value={formData.postalCode}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={errors.postalCode ? 'error' : ''}
                        data-testid="postalCode-input"
                        maxLength="5"
                    />
                    {errors.postalCode && (
                        <span className="error-message" data-testid="postalCode-error">
                            {errors.postalCode}
                        </span>
                    )}
                </div>

                {errors.submit && (
                    <div className="error-message" data-testid="submit-error">
                        {errors.submit}
                    </div>
                )}

                <button type="submit" className="submit-button" data-testid="submit-button" disabled={!isFormValid()}>
                    Register
                </button>
            </form>
        </div>
    );
};

export default RegistrationForm;
