import React from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom'
import './App.css'
import Navbar from './assets/components/navbar'
import Landing from './assets/pages/landing'
import Anime from './assets/pages/anime'

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path='/' element={ <Landing /> } />
        <Route path='/anime/:animeId' element={ <Anime /> } />
      </Routes>
    </Router>
  )
}

export default App
