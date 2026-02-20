/**
 * @file api.js
 * @description Service module for handling API requests.
 * Centralizes Axios configuration and endpoints for user management.
 */
import axios from 'axios';

/**
 * Base URL for the API.
 * Defaults to JSONPlaceholder if not provided in environment variables.
 * @constant {string}
 */
const API_URL = process.env.REACT_APP_API_URL || 'https://jsonplaceholder.typicode.com';

/**
 * API Token for authentication.
 * Retrieved from environment variables.
 * @constant {string|undefined}
 */
const API_TOKEN = process.env.REACT_APP_API_TOKEN;

// If API_TOKEN is defined, include it in the headers for all requests
/**
 * Axios configuration object.
 * Includes Authorization header if API_TOKEN is present.
 * @constant {Object|undefined}
 */
const axiosConfig = API_TOKEN ? {
    headers: { Authorization: `Bearer ${API_TOKEN}` }
} : undefined;

/**
 * Fetches the list of users from the API.
 *
 * @async
 * @function getUsers
 * @returns {Promise<Array<Object>>} A promise that resolves to an array of user objects.
 */
export const getUsers = async () => {
    const response = await axios.get(`${API_URL}/users`, axiosConfig);
    return response.data;
};

/**
 * Adds a new user to the API.
 *
 * @async
 * @function addUser
 * @param {Object} user - The user object to add.
 * @returns {Promise<Object>} A promise that resolves to the added user object (with ID).
 */
export const addUser = async (user) => {
    const response = await axios.post(`${API_URL}/users`, user, axiosConfig);
    return response.data;
};

const api = {
    getUsers,
    addUser,
};

export default api;