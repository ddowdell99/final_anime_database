import React, { useEffect, useState } from 'react'
import { Routes, Route, BrowserRouter as Router, useNavigate } from 'react-router-dom';
import Nav from './components/Nav';
import { AnimeCard } from './views/AnimeCard';
import { AnimeSearch } from './views/AnimeSearch';
import { SignUp } from './views/SignUp';
import { Login } from './views/Login';
import { Profile } from './views/Profile';
import { getDatabase, ref, set, child, get } from 'firebase/database';
import { RandomAnimeCard } from './views/RandomAnimeCard';




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
  const [message, setMessage] = useState({});
  const [randomAnimeInfo, setRandomAnimeInfo] = useState();

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
      addMessage('Already have anime in Favorites', 'danger')
      return
    }
    else {
      newFavorites[anime.mal_id] = anime
      addMessage('Anime added to favorites', 'success')
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
      addMessage('Anime already in Watch Later', 'danger')
      return
    }
    else {
      newWatchLater[anime.mal_id] = anime
      addMessage('Anime added to Watch Later', 'success')
    }
    setWatchLater(newWatchLater)
    if (user.uid) {
      addToWatchLaterDB(newWatchLater)
    }
  };

  const removeFromFavorites = (anime) => {
    const newFavorites2 = { ...favorites };
    for (let [i, anime2] of Object.entries(newFavorites2)) {
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
      addMessage('Anime removed from favorites', 'success')
    }
  };

  const removeFromWatchLater = (anime) => {
    const newWatchLater2 = { ...watchLater };
    for (let [i, anime2] of Object.entries(newWatchLater2)) {
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
      addMessage('Anime removed from watch later', 'success')
    }
  };

  const addMessage = (message, category) => {
    setMessage({ message: message, category: category })
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
        <Nav setUser={setUser} user={user} setFavorites={setFavorites} setWatchLater={setWatchLater} randomAnimeInfo={randomAnimeInfo} setRandomAnimeInfo={setRandomAnimeInfo} />
        {message?
        <div>
        <p className={`alert alert-${message.category} alert-dismissable fade show`} role="alert">{message.message}  <button onClick={() => setMessage({})} type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </p>
        </div>
        :
        <>
        </>}
        <Routes>

          <Route path='/' element={<AnimeSearch setSearch={setSearch} animeData={animeData} setAnimeInfo={setAnimeInfo} handleSearch={handleSearch}
            search={search} addFavorite={addFavorite} addWatchLater={addWatchLater} favorites={favorites} user={user} watchLater={watchLater} removeFromFavorites={removeFromFavorites}
            removeFromWatchLater={removeFromWatchLater} />} />
          <Route path='/animeCard' element={<AnimeCard animeInfo={animeInfo} addFavorite={addFavorite} addWatchLater={addWatchLater} user={user} favorites={favorites} removeFromFavorites={removeFromFavorites} watchLater={watchLater} removeFromWatchLater={removeFromWatchLater} />} />
          <Route path='/randomAnimeCard' element={<RandomAnimeCard randomAnimeInfo={randomAnimeInfo} addFavorite={addFavorite} addWatchLater={addWatchLater} user={user} favorites={favorites} removeFromFavorites={removeFromFavorites} watchLater={watchLater} removeFromWatchLater={removeFromWatchLater} />} />
          <Route path='/signup' element={<SignUp setUser={setUser} addMessage={addMessage}/>} />
          <Route path='/login' element={<Login setUser={setUser} getFavorites={getFavorites} getWatchLater={getWatchLater} addMessage={addMessage} />} />
          <Route path='/profile' element={<Profile user={user} setAnimeInfo={setAnimeInfo} watchLater={watchLater} addFavorite={addFavorite} addWatchLater={addWatchLater}
            favorites={favorites} removeFromFavorites={removeFromFavorites} removeFromWatchLater={removeFromWatchLater} />} />

        </Routes>

      </div>
    </Router>
  )
}


