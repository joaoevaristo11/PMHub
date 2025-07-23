import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

// Função para registrar um novo usuário
export const registerUser = async (userData) => {
    try {
        const response = await axios.post(`${API_URL}/auth/register`, userData);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

// Função para fazer login
export const loginUser = async (credentials) => {
    try {
        const response = await axios.post(`${API_URL}/auth/login`, credentials);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

// Função para obter o usuário autenticado
export const getAuthenticatedUser = async (token) => {
    try {
        const response = await axios.get(`${API_URL}/auth/user`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};