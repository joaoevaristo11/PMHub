const axios = require('axios');
require('dotenv').config();

const TMDB_API_URL = 'https://api.themoviedb.org/3';
const TMDB_API_KEY = process.env.TMDB_API_KEY;

const tmdbService = {
    searchMovies: async (query) => {
        try {
            const response = await axios.get(`${TMDB_API_URL}/search/movie`, {
                params: {
                    api_key: TMDB_API_KEY,
                    query: query,
                },
            });
            return response.data;
        } catch (error) {
            throw new Error('Error fetching movies from TMDB: ' + error.message);
        }
    },

    searchTVShows: async (query) => {
        try {
            const response = await axios.get(`${TMDB_API_URL}/search/tv`, {
                params: {
                    api_key: TMDB_API_KEY,
                    query: query,
                },
            });
            return response.data;
        } catch (error) {
            throw new Error('Error fetching TV shows from TMDB: ' + error.message);
        }
    },

    getMovieDetails: async (movieId) => {
        try {
            const response = await axios.get(`${TMDB_API_URL}/movie/${movieId}`, {
                params: {
                    api_key: TMDB_API_KEY,
                },
            });
            return response.data;
        } catch (error) {
            throw new Error('Error fetching movie details from TMDB: ' + error.message);
        }
    },

    getTVShowDetails: async (tvId) => {
        try {
            const response = await axios.get(`${TMDB_API_URL}/tv/${tvId}`, {
                params: {
                    api_key: TMDB_API_KEY,
                },
            });
            return response.data;
        } catch (error) {
            throw new Error('Error fetching TV show details from TMDB: ' + error.message);
        }
    },
};

module.exports = tmdbService;