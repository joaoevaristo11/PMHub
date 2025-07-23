const axios = require('axios');

const IGDB_API_URL = 'https://api.igdb.com/v4/games';
const IGDB_API_KEY = process.env.IGDB_API_KEY;

const igdbService = {
    getGames: async (searchQuery) => {
        try {
            const response = await axios.post(IGDB_API_URL, 
                `fields name, summary, cover.url; search "${searchQuery}";`, 
                {
                    headers: {
                        'Client-ID': process.env.IGDB_CLIENT_ID,
                        'Authorization': `Bearer ${IGDB_API_KEY}`,
                        'Content-Type': 'application/json'
                    }
                }
            );
            return response.data;
        } catch (error) {
            console.error('Error fetching games from IGDB:', error);
            throw error;
        }
    }
};

module.exports = igdbService;