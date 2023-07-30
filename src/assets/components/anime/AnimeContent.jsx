import React from 'react'

function AnimeContent ({animeData}) {
    return (
    <section className='flex flex-row'>
        <div className="">
            <iframe
                className='rounded-lg'
                width="560"
                height="315"
                src={animeData.data.trailer.embed_url}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen>    
            </iframe>
        </div>
        <div className=""></div>
    </section>
    )
}

export default AnimeContent;