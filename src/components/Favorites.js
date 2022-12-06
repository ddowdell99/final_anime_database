import React from 'react'

export const Favorites = ({ favorites, removeFromFavorites }) => {

    const showFavorites = () => {
        return Object.entries(favorites).map(([index, anime]) => 
        <div className='favoritesCard' key={index}>
            <img src={anime.images.jpg.large_image_url} alt={`Image of ${anime.title}`} />
            <p>{anime.title}</p>
            <button onClick={() => {removeFromFavorites(anime)}}>Remove From Favorites</button>
        </div>
        )
    };


    return (
        <div className='favorites-container'>
            {showFavorites()}
        </div>
    )
}
