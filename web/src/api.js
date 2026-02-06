import axios from 'axios';

const API_URL = 'http://localhost:8080/api/auth';

export const registerUser = async (user) => {
    try {
        return await axios.post(`${API_URL}/register`, user);
    } catch (error) {
        throw error.response ? error.response.data : "Registration failed";
    }
};

export const loginUser = async (credentials) => {
    try {
        const response = await axios.post(`${API_URL}/login`, credentials);
        if (response.data) {
            localStorage.setItem('user', JSON.stringify(response.data));
        }
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : "Login failed";
    }
};

export const logoutUser = () => {
    localStorage.removeItem('user');
};

export const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem('user'));
};