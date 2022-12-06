import React from 'react'

export const WatchLater = ({ watchLater, removeFromWatchLater, addFavorite }) => {

    const addToFavFromWL = (anime) => {
        removeFromWatchLater(anime)
        addFavorite(anime)

    };

    const showWatchLater = () => {
        return Object.entries(watchLater).map(([index, anime]) =>
            <div className='watchLaterCard' key={index}>
                <img src={anime.images.jpg.large_image_url} alt={`Image of ${anime.title}`} />
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
