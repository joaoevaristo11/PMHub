import React from 'react';

function Home() {
  console.log("Home component renderizado!");
  return (
    <div style={{backgroundColor: 'red', color: 'white', padding: '20px'}}>
      <h1>TESTE - MyMediaShelf 📚🎬</h1>
      <p>Se vês isto, o React está a funcionar!</p>
    </div>
  );
}

export default Home;