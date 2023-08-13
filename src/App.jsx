import React, { useState, useEffect } from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom'
import './dist/main.css'; // the css
import { findAnime, getGenres } from './lib/anime-api' // that api script

// Static components
import Navbar from './assets/components/Navbar'
import Footer from './assets/components/Footer'

// Pages
import Landing from './assets/pages/landing'
import Anime from './assets/pages/anime'
import Search from './assets/pages/search'
import Home from './assets/pages/home';
import NotFound404 from './assets/pages/NotFound404';
import Wewew from './assets/pages/wewew';

// Data
import pages from './assets/data/pages.json';

function App() {
  const [rpages, setPages] = useState([]);

  // inget ini belum direkomendasikan
  // variabel useState pages, pages, request useEffect ini sudah seharusnya ditempatkan lagi di komponen Navbar
  // masing-masing list navigasi teriterasi yang di Navbar harus di ubah menjadi komponen yang kemudia di iterasikan
  // jadi saat di komponen Navbar melakukan request, data akan update lagi jika data di lemparkan ke komponen genre
  useEffect(() => {
      getGenres().then((data) => {
          pages[1].child = data;
        }).finally(() => {
          setPages(pages);
      })
  }, []);

  return (
    <Router>
      <Navbar pages={rpages} />
      <Routes>
        <Route path='/' element={ <Landing /> } />
        <Route path='/search' element={ <Search /> } />
        <Route path='/anime' element={ <Home /> } />
        <Route path='/anime/:animeId' element={ <Anime /> } />
        <Route path='/wew' element={ <Wewew /> } />
        <Route path='*' element={ <NotFound404 /> } />
      </Routes>
      <Footer />
    </Router>
  )
}

export default App
