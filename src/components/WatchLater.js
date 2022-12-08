import React from 'react';
import { Link } from 'react-router-dom';

export const WatchLater = ({ watchLater, removeFromWatchLater, addFavorite, setAnimeInfo }) => {

    const addToFavFromWL = (anime) => {
        removeFromWatchLater(anime)
        addFavorite(anime)

    };

    const showWatchLater = () => {
        return Object.entries(watchLater).map(([index, anime]) =>
            <div className='watchLaterCard' key={index}>
                <Link to="/animeCard" onClick={() => setAnimeInfo(anime)}>
                <img src={anime.images.jpg.large_image_url} alt={`Image of ${anime.title}`} />
                </Link>
                <p>{anime.title}</p>
                <button onClick={() => { addToFavFromWL(anime) }}>Add To Favorites</button>
                <button onClick={() => { removeFromWatchLater(anime) }}>Remove From Watch Later</button>
            </div>
        )
    };
    return (
        <div className="showWatchLaterContainer">
            {showWatchLater()}
        </div>
    )
}
