import React, { useState } from "react";
import EpisodeGrid from "./EpisodeGrid";
import EpisodeRow from "./EpisodeRow";

function Episodes ({ episodes, images, mode }) {
    const [expandEpisodes, toggleEpisodes] = useState(false);

    return (
        <div
        className={
            (!expandEpisodes && "hidden-content") +
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
            <p className="mx-auto opacity-50 pb-10 col-span-4">// What? The episodes unwatchable? who said it's web streaming?</p>
            {episodes.length >= 8 && 
                <button className={"absolute inset-x-0 mx-0 z-10 text-lg text-pit-primary " + (expandEpisodes ? "-bottom-1" : "bottom-5")} onClick={() => { toggleEpisodes(!expandEpisodes) }}>
                    {expandEpisodes ? "Show less" : "Show more episodes"}
                </button>
            }
        </div>
    )
}

Episodes.Grid = EpisodeGrid;

export default Episodes;