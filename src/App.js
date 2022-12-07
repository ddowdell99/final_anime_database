import React, { useEffect, useState } from 'react'
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';
import Nav from './components/Nav';
import { AnimeCard } from './views/AnimeCard';
import { AnimeSearch } from './views/AnimeSearch';
import { SignUp } from './views/SignUp';
import { Login } from './views/Login';
import { Profile } from './views/Profile';
import { getDatabase, ref, set, child, get } from 'firebase/database';




export default function App() {

  const getUserFromLS = () => {
    const found = localStorage.getItem('user');
    if (found) {
      return JSON.parse(found)
    }
    return {}
  };

  const [search, setSearch] = useState('');
  const [animeData, setAnimeData] = useState();
  const [animeInfo, setAnimeInfo] = useState();
  const [user, setUser] = useState(getUserFromLS());
  const [favorites, setFavorites] = useState([]);
  const [watchLater, setWatchLater] = useState([]);

  const getData = async () => {
    const res = await fetch(`https://api.jikan.moe/v4/anime?q=${search}&limit=20&sfw`)
    const data = await res.json(); //HAVE TO AWAIT THE DATA AS WELL BC PROMISE NOT FULFILLED RIGHT AWAY
    setAnimeData(data.data)
  };

  const addToFavDB = (favorites) => {
    const db = getDatabase();
    set(ref(db, `/favorites/${user.uid}`), favorites)
  };

  const getFavorites = async (user) => {
    const dbRef = ref(getDatabase());
    const snapshot = await get(child(dbRef, `favorites/${user.uid}`))
    if (snapshot.exists()) {
      setFavorites(snapshot.val())
    }
  };

  const addFavorite = (anime) => {
    const newFavorites = { ...favorites };
    if (anime.mal_id in newFavorites) {
      alert('Already have anime in Favorites')
      return
    }
    else {
      newFavorites[anime.mal_id] = anime
      alert('Anime added to favorites')
    }
    setFavorites(newFavorites)
    if (user.uid) {
      addToFavDB(newFavorites)
    }
  };

  const addToWatchLaterDB = (watchLater) => {
    const db = getDatabase();
    set(ref(db, `/watchLater/${user.uid}`), watchLater)
  };

  const getWatchLater = async (user) => {
    const dbRef = ref(getDatabase());
    const snapshot = await get(child(dbRef, `/watchLater/${user.uid}`))
    if (snapshot.exists()) {
      setWatchLater(snapshot.val())
    }
  };

  const addWatchLater = (anime) => {
    const newWatchLater = { ...watchLater };
    if (anime.mal_id in newWatchLater) {
      alert('Anime already in Watch Later')
      return
    }
    else {
      newWatchLater[anime.mal_id] = anime
      alert('Anime added to Watch Later')
    }
    setWatchLater(newWatchLater)
    if (user.uid) {
      addToWatchLaterDB(newWatchLater)
    }
  };

  const removeFromFavorites = (anime) => {
    const newFavorites2 = { ...favorites };
    for (let [i,anime2] of Object.entries(newFavorites2)) {
      if (toString(anime.mal_id) === toString(newFavorites2[i])) {
        delete newFavorites2[anime.mal_id]
        break
      }
      else {
      }
    }
    setFavorites(newFavorites2)
    if (user.uid) {
      addToFavDB(newFavorites2)
    }
  };

  const removeFromWatchLater = (anime) => {
    const newWatchLater2 = { ...watchLater };
    for (let [i,anime2] of Object.entries(newWatchLater2)) {
      if (toString(anime.mal_id) === toString(newWatchLater2[i])) {
        delete newWatchLater2[anime.mal_id]
        break
      }
      else {
      }
    }
    setWatchLater(newWatchLater2)
    if (user.uid) {
      addToWatchLaterDB(newWatchLater2)
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();

    getData(search);
  };


  useEffect(() => {
    getData(); if (user.uid) { getFavorites(user) }; if (user.uid) { getWatchLater(user) }
  }, [search]);

  return (

    <Router>
      <div>
        <Nav setUser={setUser} user={user} setFavorites={setFavorites} setWatchLater={setWatchLater} />

        <Routes>

          <Route path='/' element={<AnimeSearch setSearch={setSearch} animeData={animeData} setAnimeInfo={setAnimeInfo} handleSearch={handleSearch}
            search={search} addFavorite={addFavorite} addWatchLater={addWatchLater} favorites={favorites} user={user} watchLater={watchLater} removeFromFavorites={removeFromFavorites}
            removeFromWatchLater={removeFromWatchLater} />} />
          <Route path='/animeCard' element={<AnimeCard animeInfo={animeInfo} addFavorite={addFavorite} addWatchLater={addWatchLater} />} />
          <Route path='/signup' element={<SignUp setUser={setUser} />} />
          <Route path='/login' element={<Login setUser={setUser} getFavorites={getFavorites} getWatchLater={getWatchLater} />} />
          <Route path='/profile' element={<Profile user={user} setAnimeInfo={setAnimeInfo} watchLater={watchLater} addFavorite={addFavorite} addWatchLater={addWatchLater}
            favorites={favorites} removeFromFavorites={removeFromFavorites} removeFromWatchLater={removeFromWatchLater}/>} />

        </Routes>

      </div>
    </Router>
  )
}


