import React from 'react'
import { Favorites } from '../components/Favorites'
import { WatchLater } from '../components/WatchLater'

export const Profile = ({ user, setAnimeInfo, watchLater, addFavorite, addWatchLater, favorites, removeFromFavorites, removeFromWatchLater }) => {

  return (
    <div className='full-container'>
      <div className='profile-name'>
        <h2>{user.displayName}</h2>
      </div>
      <p className="profile-headers">Favorites</p>
      <div className='favorites-container testimonial-group'>
        <div className='row'>
          <Favorites user={user} favorites={favorites} removeFromFavorites={removeFromFavorites} setAnimeInfo={setAnimeInfo} />
        </div>
      </div>
      <p className="profile-headers">Watch Later</p>
      <div className='watchLater-container testimonial-group'>
        <div className='watchLaterCards row'>
          <WatchLater user={user} watchLater={watchLater} removeFromWatchLater={removeFromWatchLater} addFavorite={addFavorite} setAnimeInfo={setAnimeInfo} />
        </div>

      </div>

    </div>
  )
}
