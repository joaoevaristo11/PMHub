import React, { useEffect, useState } from 'react';
import MediaCard from './MediaCard';
import { fetchUserMedia } from '../../services/api';

const MediaLibrary = () => {
    const [mediaItems, setMediaItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getUserMedia = async () => {
            try {
                const data = await fetchUserMedia();
                setMediaItems(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        getUserMedia();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {mediaItems.map((item) => (
                <MediaCard key={item.id} media={item} />
            ))}
        </div>
    );
};

export default MediaLibrary;