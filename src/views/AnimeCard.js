import React from 'react'

export const AnimeCard = ( { animeInfo } ) => {
  return (
    <div className='overall-container'>
        <div className='sidebar-container'>
            
            <img src={animeInfo.images.jpg.large_image_url} alt="Cover of Anime" />
            <h3>Extra Information</h3>
            <br />
            <h4>Type: {animeInfo.type}</h4>
            <h4>Episodes: {animeInfo.episodes}</h4>
            <h4>Aired From: {animeInfo.aired.string}</h4>
            {animeInfo.licensors[0]?
            <h4>Licensors: {animeInfo.licensors[0].name}</h4>:<></>}
            <h4>Studios: {animeInfo.studios[0].name}</h4>
            <h4 style={{display: 'inline-block'}}>Genres:</h4>
            {animeInfo.genres.map((genre,index) => {
                return (
                    <h4 style={{display: 'inline-block'}}>\\\{genre.name}</h4>
                    
                    )
                
            })}

        </div>
        <div className='information-container'>
            <div className="stats-container">
                {console.log(animeInfo)}
                <h1>{animeInfo.title} {animeInfo.title_japanese}</h1>
                <h2>Stats From MyAnimeList</h2>
                <span>
                    <h3><strong>Ranking:</strong> #{animeInfo.rank}</h3>
                    <h3>\\\\\\\\Popularity: #{animeInfo.popularity}</h3>
                    <h3>\\\\\\\\\Rating: {animeInfo.score} out of 10</h3>
                </span>
            </div>
            <div className='synopsis-container'>
                <h2>Synopsis</h2>
                <p>{animeInfo.synopsis}</p>
            </div>

        </div>
    </div>
  )
}
