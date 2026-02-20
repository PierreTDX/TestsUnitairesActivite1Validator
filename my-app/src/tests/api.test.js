/**
 * @file api.test.js
 * @description Unit tests for the API service configuration.
 */
import axios from 'axios';

jest.mock('axios');

describe('API Service Configuration', () => {
    const originalEnv = process.env;

    beforeEach(() => {
        jest.resetModules(); // Reset cache to allow re-importing module with different env
        process.env = { ...originalEnv };
    });

    afterAll(() => {
        process.env = originalEnv;
    });

    test('uses default URL if env var is missing', async () => {
        delete process.env.REACT_APP_API_URL;
        const { getUsers } = require('../services/api');
        const axiosMock = require('axios');

        axiosMock.get.mockResolvedValue({ data: [] });
        await getUsers();

        expect(axiosMock.get).toHaveBeenCalledWith('https://jsonplaceholder.typicode.com/users');
    });

    test('uses env var URL if present', async () => {
        process.env.REACT_APP_API_URL = 'http://custom-api.com';
        const { getUsers } = require('../services/api');
        const axiosMock = require('axios');

        axiosMock.get.mockResolvedValue({ data: [] });
        await getUsers();

        expect(axiosMock.get).toHaveBeenCalledWith('http://custom-api.com/users');
    });
});