import { useState } from 'react'
import NavBar from "./components/NavBar"
import HomePage from "./components/HomePage"
import './App.css'

function App() {

  return (
    <div className="App">
      <NavBar />
      <HomePage />
    </div>  
  )
}

export default App;