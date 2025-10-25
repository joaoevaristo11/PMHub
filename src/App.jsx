import { useState } from 'react'
import NavBar from "./components/MainPage/NavBar"
import HomePage from "./components/MainPage/HomePage"
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