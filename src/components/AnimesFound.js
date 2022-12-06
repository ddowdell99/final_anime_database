import React from 'react'
import { Link } from 'react-router-dom';

export const AnimesFound = ({ animeData, setAnimeInfo, addFavorite, addWatchLater, favorites, user, watchLater, removeFromFavorites, removeFromWatchLater }) => {
    return (
        <>
            {animeData ? (
                animeData.map((anime, index) => {
                    return (

                        <div className='animeCard' key={anime.mal_id} >
                            <Link to="/animeCard" onClick={() => setAnimeInfo(anime)}>
                                <img src={anime.images.jpg.large_image_url} alt="Cover of Anime" />
                                <div className='anime-info'>
                                    <h4>{anime.title}</h4>
                                </div>
                            </Link>
                            {user.uid ?
                                <>
                                    <div className='animeFound-buttons'>
                                        {anime.mal_id in favorites ?
                                            <>
                                                <button onClick={() => { removeFromFavorites(anime) }}>Remove From Favorites</button>
                                            </>
                                            :
                                            <>
                                                {anime.mal_id in watchLater ?
                                                    <>
                                                        <button onClick={() => { removeFromWatchLater(anime) }}>Remove From Watch Later</button>
                                                    </>
                                                    :
                                                    <>
                                                        <button onClick={() => { addFavorite(anime) }}>Add to Favorites</button>
                                                        <button onClick={() => { addWatchLater(anime) }}>Watch Later</button></>}
                                            </>
                                        }
                                    </div>
                                </>
                                :
                                <>
                                </>
                            }
                        </div>

                    )
                })
            ) :
                "Anime Not Found"
            }

        </>
    )
}

