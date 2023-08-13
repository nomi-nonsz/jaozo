import React from "react";
import { Link } from "react-router-dom";

function ColList ({ anime }) {
    return (
        <div className="flex-1">
            <Link to={"/anime/" + anime.mal_id} className="flex flex-col gap-2">
                <figure>
                    <img className="rounded-md hover:opacity-70 duration-200" src={anime.images.webp.image_url} alt="" />
                </figure>
                <div className="w-[80%]">{anime.title_english ? anime.title_english : anime.title}</div>
            </Link>
        </div>
    );
}

export default ColList;