import React from 'react';
import { Link, useNavigate } from 'react-router-dom';


export default function Nav({ setRandomAnimeInfo, user, setUser, setFavorites, setWatchLater }) {

  const navigate = useNavigate();

  const logOut = () => {
    localStorage.removeItem('user')
    navigate("/")
    setUser({})
    setFavorites([])
    setWatchLater([])
  };

  const randomID = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  const grabRandom = async (e) => {
    e.preventDefault()

    const res = await fetch(`https://api.jikan.moe/v4/anime/${randomID(0, 17000)}/full`)
    const data = await res.json();
    if (data.data) {
      setRandomAnimeInfo(data.data)
      navigate("/randomAnimeCard")
    }
    else {
      grabRandom(e)
    }

  };



  return (

    <nav className="navbar navbar-expand-lg">
      <div className="container-fluid nav-container">
        <Link className="navbar-brand" to="/">AnimeDojo</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/">Search</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/randomAnimeCard" onClick={(e) => grabRandom(e)}>Click Me for Random Anime!</Link>
            </li>
          </ul>

          {user.displayName ?
            <>
              <div className="collapse navbar-collapse profileNav" id="navbarSupportedContent">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                  <li className="nav-item">
                    <Link className="nav-link active" aria-current="page" to="/profile">Profile</Link>
                  </li>
                </ul>
              </div>


              <div className="welcomeBackContainer collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                  <li className="nav-item">
                    Welcome Back, {user.displayName}!
                  </li>
                </ul>
              </div>


              <div className='logout'>
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                  <li className="nav-item">
                    <Link className="nav-link" onClick={logOut}>Log Out</Link>
                  </li>
                </ul>
              </div>
            </>
            :
            <>

              <div className="loginSignUpContainer " id="navbarSupportedContent">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                  <li className="nav-item">
                    <Link className="nav-link" to="/login">Login</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/signup">Sign-Up</Link>
                  </li>
                </ul>
              </div>
            </>}



        </div>
      </div>
    </nav >
  )
}
