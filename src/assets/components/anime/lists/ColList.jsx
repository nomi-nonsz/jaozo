import React from "react";
import { Link } from "react-router-dom";
import { ReactComponent as MarkIcon } from "../../../icons/mark.svg";
import { ReactComponent as StarIcon } from "../../../icons/star.svg";

function Anime ({ anime }) {
    const save = (e) => {
        e.preventDefault();
    }

    return (
        <div className="flex-1 group">
            <Link to={"/anime/" + (anime.mal_id || anime.entry.mal_id)} className="flex flex-col gap-1">
                <figure className="w-full h-[350px] relative">
                    <img
                        className="w-full h-full object-cover rounded-md group-hover:opacity-60 duration-200"
                        srcSet={anime.images ? anime.images.webp.image_url : anime.entry.images.webp.image_url}
                        alt=""
                    />
                    <div className="absolute opacity-0 group-hover:opacity-100 poster-gradient w-full h-full top-0 left-0 transition"></div>
                    <div className="
                        absolute
                        opacity-0 group-hover:opacity-100
                        right-3 top-3
                        border border-white hover:border-primary hover:border-opacity-80
                       bg-yawn-primary bg-opacity-50
                        rounded-md
                        overflow-x-hidden
                        flex
                        items-center
                        transition
                        group/save
                        p-2
                    ">
                        <MarkIcon className="w-4 h-4 fill-white group-hover/save:fill-primary transition" />
                        <div className="w-0 group-hover/save:w-10 opacity-0 group-hover/save:opacity-100 group-hover/save:ms-2 transition-all" onClick={save}>Save</div>
                    </div>
                    <div className="absolute left-3 bottom-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition">
                        <div className="flex flex-row items-center gap-2">
                            {anime.score &&
                                <div className="border flex flex-row font-bold text-sm leading-8 gap-1 px-2 justify-center items-center border-gold text-gold rounded-md">
                                    <div><StarIcon className="w-4"/></div>
                                    <div>{anime.score}</div>
                                </div>
                            }
                            <div className="font-noto-sans">{anime.score && " | " }{anime.year}</div>
                        </div>
                        <div className="text-sm">
                            {anime.synopsis && (
                                anime.synopsis.length > 60 ? anime.synopsis.slice(0, 40) + "..." : anime.synopsis
                            )}
                        </div>
                        {anime.genres && (
                            <ul className="flex flex-row gap-x-2 flex-wrap -mt-1">
                                {[...anime.genres].slice(0, 4).map(({name}, key) => {
                                    return <li key={key} className="text-pit-primary text-xs text-opacity-80">
                                        {name}
                                    </li>
                                })}
                            </ul>
                        )}
                    </div>
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
    )
}

function Categories ({ data }) {
    return (
        <div className="col-span-2">
            <Link to={data.url} className="bg-dark-primary hover:bg-primary rounded border border-border-primary border-opacity-20 hover:border-opacity-0 h-16 flex justify-center items-center transition duration-200">
                {data.name}
            </Link>
        </div>
    )
}

function ColList ({ children }) {
    return <div className="col-span-2">{children}</div>
}

ColList.Anime = Anime;
ColList.Categories = Categories;

export default ColList;