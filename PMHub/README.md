# MyMediaShelf

MyMediaShelf is a personal digital shelf application designed to help users manage their collection of movies, series, books, and games. The application allows users to create personalized lists, write reviews, and receive recommendations based on their preferences.

## 📌 Features

- **User Authentication**: Users can register and log in to their accounts securely.
- **Media Search**: Search for movies and series using the TMDB API.
- **Personal Library**: Add items to a personal library and manage collections.
- **Custom Lists**: Create and manage lists such as "To Watch" and "Favorites".
- **Reviews and Ratings**: Evaluate and comment on titles in the library.
- **Responsive Design**: Built with React and Tailwind CSS for a modern user experience.

## 🧰 Technology Stack

- **Frontend**: 
  - React (JSX)
  - Tailwind CSS

- **Backend**: 
  - Node.js with Express (API REST)
  - JWT for authentication

- **Database**: 
  - PostgreSQL

- **External APIs**: 
  - TMDB for movies and series
  - IGDB for games (optional)

## 📁 Project Structure

```
MyMediaShelf
├── client               # Frontend application
│   ├── public
│   ├── src
│   └── package.json
├── server               # Backend application
│   ├── src
│   └── package.json
├── database             # Database migrations
├── .env                 # Environment variables
├── .gitignore           # Git ignore file
└── README.md            # Project documentation
```

## 🚀 Getting Started

1. **Clone the repository**:
   ```
   git clone <repository-url>
   cd MyMediaShelf
   ```

2. **Set up the backend**:
   - Navigate to the `server` directory.
   - Install dependencies:
     ```
     npm install
     ```
   - Create a `.env` file and add your environment variables (API keys, database connection strings).
   - Run the server:
     ```
     npm start
     ```

3. **Set up the frontend**:
   - Navigate to the `client` directory.
   - Install dependencies:
     ```
     npm install
     ```
   - Run the client:
     ```
     npm start
     ```

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.