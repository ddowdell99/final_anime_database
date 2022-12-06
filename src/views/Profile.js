import React from 'react'
import { Favorites } from '../components/Favorites'
import { WatchLater } from '../components/WatchLater'

export const Profile = ( {user, setAnimeInfo, watchLater, addFavorite, addWatchLater, favorites, removeFromFavorites, removeFromWatchLater} ) => {

  return (
    <div className='full-container'>
      <div className='profile-name'>
        <h2>{user.displayName}'s Profile</h2>
        </div>
        Favorites 
        <div className='favorites-container'>
         <Favorites user={user} favorites={favorites} removeFromFavorites={removeFromFavorites} />
        </div>
        Watch Later
        <div className='watchLater-container'>
         <div className='watchLaterCards'>
          <WatchLater user={user} watchLater={watchLater} removeFromWatchLater={removeFromWatchLater} addFavorite={addFavorite}/>
         </div>
         
        </div>
      
    </div>
  )
}
