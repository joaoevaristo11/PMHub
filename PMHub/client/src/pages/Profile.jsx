import React from 'react';

const Profile = () => {
    // Placeholder for user profile data
    const user = {
        username: 'JohnDoe',
        email: 'johndoe@example.com',
        favoriteGenres: ['Action', 'Drama', 'Sci-Fi'],
        // Add more user data as needed
    };

    return (
        <div className="max-w-4xl mx-auto p-4">
            <h1 className="text-3xl font-bold mb-4">User Profile</h1>
            <div className="bg-white shadow-md rounded-lg p-6">
                <h2 className="text-xl font-semibold">Username: {user.username}</h2>
                <p className="text-gray-700">Email: {user.email}</p>
                <h3 className="text-lg font-semibold mt-4">Favorite Genres:</h3>
                <ul className="list-disc list-inside">
                    {user.favoriteGenres.map((genre, index) => (
                        <li key={index} className="text-gray-700">{genre}</li>
                    ))}
                </ul>
                {/* Add more profile information as needed */}
            </div>
        </div>
    );
};

export default Profile;