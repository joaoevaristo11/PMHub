import React, { useEffect, useState } from 'react';
import MediaLibrary from '../components/Library/MediaLibrary';
import SearchBar from '../components/Search/SearchBar';
import { getUserMedia } from '../services/api';

const Dashboard = () => {
    const [media, setMedia] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUserMedia = async () => {
            try {
                const response = await getUserMedia();
                setMedia(response.data);
            } catch (error) {
                console.error("Error fetching user media:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchUserMedia();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="dashboard">
            <h1 className="text-2xl font-bold mb-4">Your Media Dashboard</h1>
            <SearchBar />
            <MediaLibrary media={media} />
        </div>
    );
};

export default Dashboard;