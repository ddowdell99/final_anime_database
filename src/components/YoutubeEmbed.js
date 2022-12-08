import React from 'react';

export const YoutubeEmbed = ({ embedId, animeTitle }) => {

    return (
        <div className='video-responsive'>
            <iframe
                width='853'
                height='480'
                src={embedId}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media"
                allowFullScreen
                title={`Embeded Youtube of ${animeTitle}`}
            />
        </div>

    )
}
