import React, { useEffect, useState } from 'react'
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';
import Nav from './components/Nav';
import { AnimeCard } from './views/AnimeCard';
import { AnimeSearch } from './views/AnimeSearch';
import { SignUp } from './views/SignUp';
import { Login } from './views/Login';
import { Profile } from './views/Profile';




export default function App() {

  const getUserFromLS = () => {
    const found = localStorage.getItem('user');
    if (found) {
      return JSON.parse(found)
    }
    return {}
  }

  const [search, setSearch] = useState('Naruto')
  const [animeData, setAnimeData] = useState()
  const [animeInfo, setAnimeInfo] = useState()
  const [user, setUser] = useState(getUserFromLS())

  const getData = async () => {
    const res = await fetch(`https://api.jikan.moe/v4/anime?q=${search}&limit=20`)
    const data = await res.json(); //HAVE TO AWAIT THE DATA AS WELL BC PROMISE NOT FULFILLED RIGHT AWAY
    setAnimeData(data.data)
  }

  const handleSearch = (e) => {
    e.preventDefault();

    getData(search);
  }

  useEffect(() => {
    getData()
  }, [search])

  return (

    <Router>
      <div>
        <Nav setUser={setUser} user={user} />

        <Routes>

          <Route path='/' element={<AnimeSearch setSearch={setSearch} animeData={animeData} setAnimeInfo={setAnimeInfo} handleSearch={handleSearch} search={search} />} />
          <Route path='/animeCard' element={<AnimeCard animeInfo={animeInfo} />} />
          <Route path='/signup' element={<SignUp setUser={setUser} />} />
          <Route path='/login' element={<Login setUser={setUser}/>} />
          <Route path='/profile' element={<Profile />} />

        </Routes>

      </div>
    </Router>
  )
}


