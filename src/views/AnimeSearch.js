import React from 'react'
import { AnimesFound } from '../components/AnimesFound'

export const AnimeSearch = ({ setSearch, animeData, setAnimeInfo, handleSearch, search, addFavorite, addWatchLater, favorites, user, watchLater, removeFromFavorites, removeFromWatchLater }) => {
    return (
        <>
        <div className='realSearchBoxContainer'>
        <div className='searchBoxContainer'>
            <form className="d-flex search-box w-100" role="search" onSubmit={handleSearch}>
                <input className="form-control me-2" type="search" placeholder="Search For Anime..." aria-label="Search" value={search} onChange={(e) => {setSearch(e.target.value)}} />
                <button className="btn btn-outline-success searchCommand" type="submit">Search</button>
            </form>
            </div>
            </div>

            <div className='container'>
                <div className='animeInfo'>

                </div>
                <div className='anime-row'>
                    <div className='row'>
                        <AnimesFound animeData={animeData} setAnimeInfo={setAnimeInfo} addFavorite={addFavorite} addWatchLater={addWatchLater} favorites={favorites} user={user} 
                        watchLater={watchLater} removeFromFavorites={removeFromFavorites} removeFromWatchLater={removeFromWatchLater} />
                    </div>
                </div>
            </div>
        </>
    )
}
