import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ReactComponent as MarkIcon } from "../../../icons/mark.svg";
import { ReactComponent as StarIcon } from "../../../icons/star.svg";

function Anime ({ anime }) {
    if (!anime) {
        return (
            <div className="col-span-2 flex flex-col gap-5">
                <div className="w-full h-[350px] fronta-loading rounded-md"></div>
                <div className="flex flex-col gap-3">
                    <div className="w-[80%] fronta-loading h-8 rounded"></div>
                    <div className="w-[30%] fronta-loading h-5 rounded"></div>
                </div>
            </div>
        )
    }

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

function LongLoading () {
    return (
        <div className="h-[280px] rounded-3xl fronta-loading"></div>
    )
}

function LongAnime ({ anime }) {
    const navigate = useNavigate();
    const { genres, mal_id, episodes } = anime;

    const title = anime.title_english || anime.title;
    const genre = genres.length > 1 ? genres[Math.floor(Math.random() * genres.length)] : genres[0];

    const navto = () => {
        navigate("" + genre.name.toLowerCase().replace(/\s+/g, "-"))
    }

    return (
        <div
            className="
                h-[280px] bg-no-repeat bg-center bg-zoom hover:bg-zoomed rounded-3xl relative transition-all cursor-pointer
                before:absolute before:rounded-3xl before:content-[''] before:w-full before:h-full before:bg-gradient-to-b before:from-transparent before:to-dark-primary
            "
            style={{ backgroundImage: `url(${anime.images.jpg.large_image_url})` }}
        >
            <div className="absolute w-full h-full flex flex-col justify-end gap-1 p-8">
                <div className="">{episodes || "No"} Episodes</div>
                <h1 className="text-xl">{title}</h1>
            </div>
            <div className="absolute w-full h-full" onClick={() => { navigate("/anime/" + mal_id) }}></div>
            <div className="absolute top-6 right-6 bg-dark-pit-primary bg-opacity-90 py-2 px-5 rounded-md font-bold text-yolo-primary text-sm" onClick={navto}>{genre.name}</div>
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

LongAnime.Loading = LongLoading;

ColList.Anime = Anime;
ColList.Categories = Categories;
ColList.LongAnime = LongAnime;

export default ColList;