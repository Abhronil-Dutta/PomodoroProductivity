import axios from 'axios';

const API_URL = 'http://153.33.8.38:8080/api/sessions';

export const saveSession = async (session) => {
    try {
        const response = await axios.post(API_URL, session);
        return response.data;
    } catch (error) {
        console.error('Error saving session: ', error);
        throw error;
    }
};

export const getSessionsByDateRange = async (startDate, endDate) => {
    try {
        const response = await axios.get(`${API_URL}/date-range`, {
            params: {startDate, endDate},
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching sessions by date range: ' , error);
        throw error;
    }
};

