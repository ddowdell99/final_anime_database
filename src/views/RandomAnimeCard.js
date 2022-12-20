import React from 'react'
import { YoutubeEmbed } from '../components/YoutubeEmbed'

export const RandomAnimeCard = ( { randomAnimeInfo, addFavorite, addWatchLater, user, favorites, removeFromFavorites, watchLater, removeFromWatchLater }) => {
  return (
    
    <div className='overall-container'>
            <div className='sidebar-container'>

                <img src={randomAnimeInfo.images.jpg.large_image_url} alt={`Cover of ${randomAnimeInfo.title}`} />
                <div className='sidebar-info'>

                    <h4><strong>Ranking:</strong> #{randomAnimeInfo.rank}</h4>
                    <h4><strong>Popularity:</strong> #{randomAnimeInfo.popularity}</h4>
                    <h4><strong>MAL Score:</strong> {randomAnimeInfo.score} out of 10</h4>
                    <h4><strong>Type:</strong> {randomAnimeInfo.type}</h4>
                    <h4><strong>Episodes:</strong> {randomAnimeInfo.episodes}</h4>
                    <h4><strong>Aired From:</strong> {randomAnimeInfo.aired.string}</h4>
                    {/* Need to figure out how to add this back in. Kept breaking code when licensor or studio was null */}
                    {/* {randomAnimeInfo.licensors?
                        <h4><strong>Licensors:</strong> {randomAnimeInfo.licensors[0].name}</h4> : <></>}
                    {randomAnimeInfo.studios?
                        <h4><strong>Studios:</strong> {randomAnimeInfo.studios[0].name}</h4> : <></>} */}
                    <h4 style={{ display: 'inline-block' }}><strong>Genres:</strong></h4>

                    {randomAnimeInfo.genres.map((genre, index) => {
                        return (
                            <h4 style={{ display: 'inline-block' }}>&nbsp;|&nbsp;{genre.name} |</h4>
                        )


                    })}
                    <h4><strong>Rating: </strong>{randomAnimeInfo.rating}</h4>


                </div>
            </div>
            <div className='information-container'>
                <div className="stats-container">
                    <h1>{randomAnimeInfo.title} {randomAnimeInfo.title_japanese}</h1>

                    {user.uid ?
                        <>
                            <div className='animeFound-buttons'>
                                {randomAnimeInfo.mal_id in favorites ?
                                    <>
                                        <button onClick={() => { removeFromFavorites(randomAnimeInfo) }}>Remove From Favorites</button>
                                    </>
                                    :
                                    <>
                                        {randomAnimeInfo.mal_id in watchLater ?
                                            <>
                                                <button onClick={() => { removeFromWatchLater(randomAnimeInfo) }}>Remove From Watch Later</button>
                                            </>
                                            :
                                            <>
                                                <button onClick={() => { addFavorite(randomAnimeInfo) }}>Add to Favorites</button>
                                                <button onClick={() => { addWatchLater(randomAnimeInfo) }}>Watch Later</button></>}
                                    </>
                                }
                            </div>
                        </>
                        :
                        <>
                        </>

                    }</div>
                <div className='synopsis-container'>
                    <p>{randomAnimeInfo.synopsis}</p>
                </div>
                {randomAnimeInfo.trailer?
                    <div className='trailer-container'>
                    <YoutubeEmbed embedId={randomAnimeInfo.trailer.embed_url} animeTitle={randomAnimeInfo.title} />
                </div>
                    :
<></>
                }
            </div>
        </div>
    )
}

