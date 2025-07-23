import React from 'react';
import SearchBar from '../components/Search/SearchBar';
import MediaLibrary from '../components/Library/MediaLibrary';

const Home = () => {
    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-4">My Media Shelf</h1>
            <SearchBar />
            <MediaLibrary />
        </div>
    );
};

export default Home;