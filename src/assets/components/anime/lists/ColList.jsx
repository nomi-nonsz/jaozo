import React from "react";
import { Link } from "react-router-dom";

function ColList ({ anime }) {
    return (
        <div className="flex-1">
            <Link to={"/anime/" + (anime.mal_id || anime.entry.mal_id)} className="flex flex-col gap-1">
                <figure className="w-full">
                    <img className="w-full rounded-md hover:opacity-70 duration-200" src={anime.images ? anime.images.webp.image_url : anime.entry.images.webp.image_url} alt="" />
                </figure>
                <div className="w-[80%] pt-3">
                    {anime.title_english ? anime.title_english : (anime.title ? anime.title : anime.entry.title)}
                </div>
                <div className="text-white opacity-50 text-sm">
                    {!Array.isArray(anime.episodes) ?
                        <>{anime.episodes} Episodes</> :
                        <>
                            Updated {anime.episodes.map((ep, i) => {
                                return ep.title.split(" ")[1] + (i < anime.episodes.length - 1 ? ", " : " ")
                            })}
                            {anime.episodes.length > 0 ? "Episodes" : "Episode"}
                        </>
                    }
                </div>
            </Link>
        </div>
    );
}

export default ColList;