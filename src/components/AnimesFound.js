import React from 'react'
import { Link } from 'react-router-dom';

export const AnimesFound = ({ animeData, setAnimeInfo }) => {
    return (
        <>
            {animeData ? (
                animeData.map((anime, index) => {
                    return (
                        
                        <div className='animeCard' key={index} >
                            <Link to="/animeCard" onClick={() => setAnimeInfo(anime)}>
                            <img src={anime.images.jpg.large_image_url} alt="Cover of Anime" />
                            <div className='anime-info'>
                                <h4>{anime.title}</h4>
                            </div>
                            </Link>
                        </div>
                       
                    )
                })
            ) :
                "Anime Not Found"
            }

        </>
    )
}

