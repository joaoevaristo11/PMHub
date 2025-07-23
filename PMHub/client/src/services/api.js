import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Function to search for movies and series
export const searchMedia = async (query) => {
  try {
    const response = await api.get(`/media/search`, { params: { query } });
    return response.data;
  } catch (error) {
    throw new Error('Error searching media: ' + error.message);
  }
};

// Function to add media to the user's library
export const addMediaToLibrary = async (mediaData, token) => {
  try {
    const response = await api.post('/media', mediaData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error('Error adding media to library: ' + error.message);
  }
};

// Function to get the user's media library
export const getUserLibrary = async (token) => {
  try {
    const response = await api.get('/media/library', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error('Error fetching user library: ' + error.message);
  }
};