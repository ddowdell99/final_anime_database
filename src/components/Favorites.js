import React from 'react';
import { Link } from 'react-router-dom';

export const Favorites = ({ favorites, removeFromFavorites, setAnimeInfo }) => {

    const showFavorites = () => {
        return Object.entries(favorites).map(([index, anime]) =>
            <div className='favoritesCard col-xs-4' key={index}>
                <Link to="/animeCard" onClick={() => setAnimeInfo(anime)}>
                <img src={anime.images.jpg.large_image_url} alt={`Image of ${anime.title}`} />
                </Link>
                <p>{anime.title}</p>
                <button onClick={() => { removeFromFavorites(anime) }}>Remove From Favorites</button>
            </div>
        )
    };


    return (
        <div className='favorites-container'>
            {showFavorites()}
        </div>
    )
}
