import axios from 'axios';


const API_URL = 'http://localhost:8080/api'; // add your IPv4 address

export const signup = async (username, password) => {
    try {
        const response = await axios.post(`${API_URL}/users/signup`, { username, password });
        return response.data; 
    } catch (error) {
        if (error.response) {
            throw new Error(error.response.data.message || 'Something went wrong during signup.');
        }
        throw error;
    }
};

export const login = async (username, password) => {
    try {
        const response = await axios.post(`${API_URL}/users/login`, { username, password });
        return response.data;
    } catch (error) {
        if (error.response) {
            throw new Error(error.response.data.message || 'Invalid username or password.');
        }
        throw error;
    }
};



export const createSession = async (session, userId) => {
    if (!userId || isNaN(Number(userId))) {
      throw new Error(`Invalid userId: Received ${userId}`);
    }
    try {
      const response = await axios.post(`${API_URL}/sessions?userId=${userId}`, session);
      return response.data;
    } catch (error) {
      console.error('Error in createSession:', error.response?.data || error.message);
      throw error;
    }
  };

export const fetchSessionByUser = async (userID) => {
    console.log(userID);
    if (!userID || isNaN(userID)) {
        throw new Error('Invalid userId: Must be a numeric value.');
    }
    const response = await axios.get(`${API_URL}/sessions/user/${userID}`);
    return response.data;
}
