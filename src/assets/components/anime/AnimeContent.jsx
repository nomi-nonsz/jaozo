import React, { useState } from 'react'
import FButton from '../buttons/FButton';
import EpisodeGrid from './EpisodeGrid';
import { ReactComponent as StarIcon } from '../../icons/star.svg';
import { ReactComponent as PlayIcon } from '../../icons/play.svg';
import { ReactComponent as MarkIcon } from '../../icons/mark.svg';

function AnimeContent ({animeData, episodeData}) {
    const anime = {
        title: animeData.data.title_english ? animeData.data.title_english : animeData.data.title,
        status: animeData.data.status,
        genres: animeData.data.genres,
        themes: animeData.data.themes,
        synopsis: animeData.data.synopsis,
        score: animeData.data.score,
        rating: animeData.data.rating,
        year: animeData.data.year,
        trailer: animeData.data.trailer.embed_url,
        trailerImage: animeData.data.trailer.images.medium_image_url,
        episodes: episodeData.data
    }

    const [expandSynopsis, toggleSynopsis] = useState(false);
    const synopsisMaxLength = 150;

    const [expandEpisodes, toggleEpisodes] = useState(false);

    function TagsElement ({ children }) {
        return (
            <button className="px-5 py-1 rounded bg-border-primary bg-opacity-30 hover:bg-opacity-20 transition duration-150 text-sm">{children}</button>
        );
    }

    return (
    <div className='flex flex-col gap-6'>
        <section className='flex flex-row gap-8'>
            <div className="relative flex-1 w-[560px] h-[315px]">
                <iframe
                    className="rounded-xl absolute z-10 w-full h-full"
                    src={anime.trailer}
                    title="YouTube video player"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                >    
                </iframe>
                <div
                    className={`
                        absolute
                        top-0
                        left-0
                        scale-110
                        w-full
                        h-full
                        blur-xl
                        opacity-30
                    `}
                    style={{
                        background: `url('${anime.trailerImage}')`
                    }}
                ></div>
                <div
                    className={`
                        absolute
                        top-0
                        left-0
                        rounded-xl
                        bg-cover
                        bg-no-repeat
                        w-full
                        h-full
                    `}
                    style={{
                        backgroundImage: `url('${anime.trailerImage}')`
                    }}
                ></div>
            </div>
            <div className="text-white flex-1 flex flex-col gap-4">
                <header className='font-bold font-montserrat'>
                    <div className="text-3xl">
                        {anime.title}
                    </div>
                    <div className="text-xl text-primary">{animeData.data.status}</div>
                </header>
                <div className="font-noto-sans">
                    <article className="relative">
                        <p className={!expandSynopsis && `
                            before:content-['']
                            before:absolute
                            before:bottom-0
                            before:left-0
                            before:w-full
                            before:h-1/2
                            before:from-transparent
                            before:to-yawn-primary
                            before:bg-gradient-to-b
                            before:pointer-events-none
                        `}>
                            {!expandSynopsis ? 
                                anime.synopsis.length > synopsisMaxLength ? anime.synopsis.slice(0, synopsisMaxLength) + "..." : anime.synopsis :
                                anime.synopsis
                            }
                        </p>
                    </article>
                    {anime.synopsis.length > synopsisMaxLength && <button className="text-primary" onClick={() => { toggleSynopsis(!expandSynopsis) }}>
                        {expandSynopsis ? "Read Less" : "Read More"}
                    </button>}
                </div>
                <div className="flex flex-row items-center gap-4">
                    <div className="border-2 flex flex-row font-bold leading-8 p-1 gap-1 w-20 justify-center items-center border-gold text-gold rounded-md">
                        <div><StarIcon /></div>
                        <div>{anime.score}</div>
                    </div>
                    <div className="font-bold font-noto-sans text-lg">{anime.rating} | {anime.year}</div>
                </div>
                <div className="flex flex-row flex-wrap items-center gap-4">
                    {anime.genres.map((g, k) => {
                        return <TagsElement key={k}>{g.name}</TagsElement>
                    })}
                    {anime.themes.map((t, k) => {
                        return <TagsElement key={k}>{t.name}</TagsElement>
                    })}
                </div>
                <div className="flex flex-row gap-4">
                    <FButton mode="original">
                        <div><PlayIcon /></div>
                        <div>Play</div>
                    </FButton>
                    <FButton mode="invert">
                        <div><MarkIcon /></div>
                        <div>Add to list</div>
                    </FButton>
                </div>
            </div>
        </section>
        <hr />
        <section className="flex flex-col gap-4">
            <header>
                <h2 className='text-xl'>Episodes</h2>
            </header>
            <div
                className={(!expandEpisodes && "hidden-content") + `
                    relative
                    flex
                    flex-row
                    flex-wrap
                    gap-4
                    overflow-y-hidden`}
                style={{ height: expandEpisodes ? "fit-content" : "480px" }}>
                { anime.episodes.map((episode, key) => {
                    return (
                        <EpisodeGrid
                            key={key}
                            id={episode.mal_id}
                            title={episode.title}
                            img={anime.trailerImage}
                            autoWidth={key < anime.episodes.length ? true : false}
                        />
                    )
                }) }
                {anime.episodes.length >= 8 && 
                    <button className={"absolute inset-x-0 mx-0 z-10 text-lg text-pit-primary " + (expandEpisodes ? "-bottom-1" : "bottom-5")} onClick={() => { toggleEpisodes(!expandEpisodes) }}>
                        {expandEpisodes ? "Show less" : "Show more episodes"}
                    </button>
                }
            </div>
        </section>
        <hr />
    </div>
    )
}

export default AnimeContent;