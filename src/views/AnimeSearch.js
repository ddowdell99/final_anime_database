import React from 'react'
import { AnimesFound } from '../components/AnimesFound'

export const AnimeSearch = ({ setSearch, animeData, setAnimeInfo, handleSearch, search }) => {
    return (
        <>
            <form className="d-flex search-box" role="search" onSubmit={handleSearch}>
                <input className="form-control me-2" type="search" placeholder="Search For Anime..." aria-label="Search" value={search} onChange={(e) => {setSearch(e.target.value)}} />
                <button className="btn btn-outline-success" type="submit">Search</button>
            </form>

            <div className='container'>
                <div className='animeInfo'>

                </div>
                <div className='anime-row'>
                    <div className='row'>
                        <AnimesFound animeData={animeData} setAnimeInfo={setAnimeInfo} />
                    </div>
                </div>
            </div>
        </>
    )
}
