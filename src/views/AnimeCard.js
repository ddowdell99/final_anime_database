import React from 'react'
import { YoutubeEmbed } from '../components/YoutubeEmbed'

export const AnimeCard = ({ animeInfo, addFavorite, addWatchLater, user, favorites, removeFromFavorites, watchLater, removeFromWatchLater }) => {
    return (
        <div className='overall-container'>
            <div className='sidebar-container'>

                <img src={animeInfo.images.jpg.large_image_url} alt={`Cover of ${animeInfo.title}`} />
                <div className='sidebar-info'>

                    <h4><strong>Ranking:</strong> #{animeInfo.rank}</h4>
                    <h4><strong>Popularity:</strong> #{animeInfo.popularity}</h4>
                    <h4><strong>Type:</strong> {animeInfo.type}</h4>
                    <h4><strong>Episodes:</strong> {animeInfo.episodes}</h4>
                    <h4><strong>Aired From:</strong> {animeInfo.aired.string}</h4>
                    {animeInfo.licensors?
                        <h4><strong>Licensors:</strong> {animeInfo.licensors[0].name}</h4> : <></>}
                    {animeInfo.studios?
                        <h4><strong>Studios:</strong> {animeInfo.studios[0].name}</h4> : <></>}
                    <h4 style={{ display: 'inline-block' }}><strong>Genres:</strong></h4>

                    {animeInfo.genres.map((genre, index) => {
                        return (
                            <h4 style={{ display: 'inline-block' }}>&nbsp;|&nbsp;{genre.name} |</h4>
                        )


                    })}
                    <h4><strong>Rating: </strong>{animeInfo.rating}</h4>


                </div>
            </div>
            <div className='information-container'>
                <div className="stats-container">
                    <h1>{animeInfo.title} {animeInfo.title_japanese}</h1>

                    {user.uid ?
                        <>
                            <div className='animeFound-buttons'>
                                {animeInfo.mal_id in favorites ?
                                    <>
                                        <button onClick={() => { removeFromFavorites(animeInfo) }}>Remove From Favorites</button>
                                    </>
                                    :
                                    <>
                                        {animeInfo.mal_id in watchLater ?
                                            <>
                                                <button onClick={() => { removeFromWatchLater(animeInfo) }}>Remove From Watch Later</button>
                                            </>
                                            :
                                            <>
                                                <button onClick={() => { addFavorite(animeInfo) }}>Add to Favorites</button>
                                                <button onClick={() => { addWatchLater(animeInfo) }}>Watch Later</button></>}
                                    </>
                                }
                            </div>
                        </>
                        :
                        <>
                        </>

                    }</div>
                <div className='synopsis-container'>
                    <p>{animeInfo.synopsis}</p>
                </div>
                {animeInfo.trailer?
                    <div className='trailer-container'>
                    {console.log(animeInfo)}
                    <YoutubeEmbed embedId={animeInfo.trailer.embed_url} animeTitle={animeInfo.title} />
                </div>
                    :
<></>
                }
            </div>
        </div>
    )
}
