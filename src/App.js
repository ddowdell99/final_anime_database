import React, { useEffect, useState } from 'react'
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';
import Nav from './components/Nav';
import { AnimeCard } from './views/AnimeCard';
import { AnimeSearch } from './views/AnimeSearch';
import Home from './views/Home';


export default function App() {

  const [search, setSearch] = useState('Naruto')
  const [animeData, setAnimeData] = useState()
  const [animeInfo, setAnimeInfo] = useState()

  const getData = async() => {
    const res = await fetch(`https://api.jikan.moe/v4/anime?q=${search}&limit=20`)
    const data = await res.json(); //HAVE TO AWAIT THE DATA AS WELL BC PROMISE NOT FULFILLED RIGHT AWAY
    setAnimeData(data.data)
  }

  useEffect(() => {
    getData()
  }, [search])

  return (

    <Router>
    <div>
      <Nav />

      <Routes>

        <Route path='/' element={<Home />} />
        <Route path='/search' element={<AnimeSearch setSearch={setSearch} animeData={animeData} setAnimeInfo={setAnimeInfo}/>} />
        <Route path='/animeCard' element={<AnimeCard animeInfo={animeInfo} />} />

      </Routes>

    </div>
    </Router>
  )
}


