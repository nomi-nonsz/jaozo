import React, { useState } from "react";
import EpisodeGrid from "./EpisodeGrid";
import EpisodeRow from "./EpisodeRow";
import NoB from "../../../../images/no.png"

function Episodes ({ episodes, images, mode }) {
    const [expandEpisodes, toggleEpisodes] = useState(false);

    return (
        <div
        className={
            ((episodes.length > 0 && episodes.length >= 8 && !expandEpisodes) && "hidden-content") +
            ((mode === 'collumn' || mode === 'col') ? `
            flex
            flex-col
            ` : `
            grid
            grid-cols-1
            xs:grid-cols-2
            md:grid-cols-3
            xl:grid-cols-4
            `) + `
            relative
            gap-4
            overflow-y-hidden`}
        style={{ height: expandEpisodes ? "fit-content" : "480px" }}>
            { episodes.length > 0 ? (
                <>
                { episodes.map((episode, key) => {
                    if (mode === 'collumn' || mode === 'col') {
                        return (
                            <EpisodeRow
                                key={key}
                                id={episode.mal_id}
                                title={episode.title}
                                img={images}
                            />
                        )
                    }
                    return (
                        <EpisodeGrid
                            key={key}
                            id={episode.mal_id}
                            title={episode.title}
                            img={images}
                        />
                    )
                }) }
                <p className="mx-auto opacity-50 pb-10 col-span-4">// What? The episodes unwatchable? who said it's for web streaming?</p>
                {(episodes.length > 0 && episodes.length >= 8) && 
                    <button className={"absolute inset-x-0 mx-0 z-10 text-lg text-pit-primary " + (expandEpisodes ? "-bottom-1" : "bottom-5")} onClick={() => { toggleEpisodes(!expandEpisodes) }}>
                        {expandEpisodes ? "Show less" : "Show more episodes"}
                    </button>
                }
                </>)
                :
                <header className="text-center my-auto flex flex-col gap-8 m-auto">
                    <picture className="relative w-fit">
                        <img className="rounded-2xl" src={NoB} alt="Megamind no episodes" />
                        <div className="bottom-5 left-1/2 -translate-x-1/2 absolute text-3xl font-bold w-full">No Episodes?</div>
                    </picture>
                    <p className="">No episodes available</p>
                </header>
            }
        </div>
    )
}

Episodes.Grid = EpisodeGrid;

export default Episodes;