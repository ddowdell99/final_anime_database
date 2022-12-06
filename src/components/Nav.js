import React from 'react';
import { Link, useNavigate } from 'react-router-dom';


export default function Nav({ setSearch, user, setUser, setFavorites, setWatchLater }) {

  const navigate = useNavigate();

  const logOut = () => {
    localStorage.removeItem('user')
    setUser({})
    setFavorites([])
    setWatchLater([])
    navigate('/')
  };

  return (
    <nav className="navbar navbar-expand-lg">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">AnimeDojo</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/">Search</Link>
            </li>
            {user.displayName ?
              <>
                <li className="nav-item">
                  <Link className="nav-link active" aria-current="page" to="/profile">Profile</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" onClick={logOut}>Log Out</Link>
                </li>
                <div>
                  Welcome Back, {user.displayName}!
                </div>
              </>
              :
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">Login</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/signup">Sign-Up</Link>
                </li>
                <div>
                  Hello, GUEST!
                </div>
              </>}


          </ul>
        </div>
      </div>
    </nav>
  )
}
