import React, { useState, useEffect } from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom'
import './dist/main.css'; // the css
import { getGenres } from './lib/anime-api' // that api script

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

// Context
import { FeaturedContext } from './assets/context/featuredContext';

function App() {
  const [rpages, setPages] = useState([]);
  let isRequest = false;

  const [homeContent, setContent] = useState({
    content: {
      hot: null,
      hotSummary: null,
      top: null,
      eps: null,
      genre: null,
      airing: null
    }
  });

  // kecuali kalo pake useContext
  useEffect(() => {
    
    if (!isRequest) {
      getGenres().then((data) => {
          pages[1].child = data;
        }).finally(() => {
          setPages(pages);
      })
    }

    return () => { isRequest = true }
  }, []);

  return (
    <FeaturedContext.Provider value={{ content: homeContent, setContent }}>
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
    </FeaturedContext.Provider>
  )
}

export default App
