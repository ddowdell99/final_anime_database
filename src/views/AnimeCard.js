import React from 'react'

export const AnimeCard = ({ animeInfo, addFavorite, addWatchLater }) => {
    return (
        <div className='overall-container'>
            <div className='sidebar-container'>

                <img src={animeInfo.images.jpg.large_image_url} alt="Cover of Anime" />
                <div className='sidebar-info'>

                <h4>Ranking: #{animeInfo.rank}</h4>
                <h4>Popularity: #{animeInfo.popularity}</h4>
                <h4>Type: {animeInfo.type}</h4>
                <h4>Episodes: {animeInfo.episodes}</h4>
                <h4>Aired From: {animeInfo.aired.string}</h4>
                {animeInfo.licensors[0] ?
                    <h4>Licensors: {animeInfo.licensors[0].name}</h4> : <></>}
                {animeInfo.studios[0] ?
                    <h4>Studios: {animeInfo.studios[0].name}</h4> : <></>}
                <h4 style={{ display: 'inline-block' }}>Genres:</h4>

                {animeInfo.genres.map((genre, index) => {
                    return (
                        <h4 style={{ display: 'inline-block' }}>&nbsp;|&nbsp;{genre.name} |</h4>
                    )


                })}
                                

            </div>
            </div>
            <div className='information-container'>
                <div className="stats-container">
                    <h1>{animeInfo.title} {animeInfo.title_japanese}</h1>
                    <div className='animeCardButtons'>
<button onClick={() => {addFavorite(animeInfo)}}>Add To Favorites</button>
<button onClick={() => {addWatchLater(animeInfo)}}>Watch Later</button>
</div>

                </div>
                <div className='synopsis-container'>
                    <p>{animeInfo.synopsis}</p>
                </div>

            </div>
        </div>
    )
}
