import axios from 'axios';

const API_URL = 'http://localhost:8080/api/sessions'; 

export const saveSession = async (session) => {
    try {
        const response = await axios.post(API_URL, session);
        return response.data;
    } catch (error) {
        console.error('Error saving session: ', error);
        throw error;
    }
};

export const getSessionsByUser = async (userId) => {
    try {
        const response = await axios.get(`${API_URL}/user/${userId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching sessions by user: ', error);
        throw error;
    }
};

