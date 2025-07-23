import React from 'react';

const MediaCard = ({ media, onAddToLibrary, onRate, onComment }) => {
    const { title, poster_path, overview, release_date, vote_average } = media;

    return (
        <div className="max-w-sm rounded overflow-hidden shadow-lg">
            <img className="w-full" src={`https://image.tmdb.org/t/p/w500${poster_path}`} alt={title} />
            <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">{title}</div>
                <p className="text-gray-700 text-base">{overview}</p>
                <p className="text-gray-600 text-sm">Release Date: {release_date}</p>
                <p className="text-gray-600 text-sm">Rating: {vote_average}</p>
            </div>
            <div className="px-6 pt-4 pb-2">
                <button 
                    onClick={() => onAddToLibrary(media)} 
                    className="inline-block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                    Add to Library
                </button>
                <button 
                    onClick={() => onRate(media)} 
                    className="inline-block bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded ml-2"
                >
                    Rate
                </button>
                <button 
                    onClick={() => onComment(media)} 
                    className="inline-block bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded ml-2"
                >
                    Comment
                </button>
            </div>
        </div>
    );
};

export default MediaCard;