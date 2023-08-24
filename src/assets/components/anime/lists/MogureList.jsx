import React from "react";
import { Link } from "react-router-dom";

function MogureList () {
    return <>What?</>
}

function Anime ({ anime }) {
    const title = anime.title_english || anime.title;

    return (
        <Link className="flex flex-row items-center bg-border-primary bg-opacity-0 hover:bg-opacity-10 transition rounded-xl" to={"/anime/" + anime.mal_id}>
            <figure className="">
                <img src={anime.images.webp.image_url} className="h-32 w-32 object-cover rounded-xl" alt="" />
            </figure>
            <div className="flex-1 flex flex-col gap-1 px-6 text-sm">
                <div className="">{title.length > 30 ? title.slice(0, 30) + "..." : title}</div>
                <div className="text-xs text-white text-opacity-50">{anime.episodes || "idk"} episodes</div>
            </div>
        </Link>
    )
}

function Loading () {
    return (
        <Link className="flex flex-row items-center">
            <div className="h-32 w-32 object-cover rounded-xl fronta-loading"></div>
            <div className="flex-1 flex flex-col gap-2 px-6 text-sm">
                <div className="w-[80%] h-4 rounded fronta-loading"></div>
                <div className="w-[65%] h-4 rounded fronta-loading"></div>
                <div className="w-[40%] h-2 rounded fronta-loading"></div>
            </div>
        </Link>
    )
}

MogureList.Anime = Anime;
MogureList.Loading = Loading;

export default MogureList;