import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import FButton from "../buttons/FButton";
import { ReactComponent as PlayIcon } from "../../icons/play.svg";
import { ReactComponent as MarkIcon } from "../../icons/mark.svg";

function SearchResult ({ animeData }) {
    const navigate = useNavigate();
    const results = animeData.data;
    const synopsisLength = 150;

    if (!results) return;

    if (results.length < 1) {
        return (
            <div className="">Couldn't find anime you looking for {":("}</div>
        );
    }

    const synopsis = (res) => {
        if (window.innerWidth <= 640) {
            return (
                res.synopsis.length > synopsisLength ? res.synopsis.slice(0, synopsisLength - 100) + "..." : res.synopsis
            )
        }
        else {
            return (
                res.synopsis.length > synopsisLength ? res.synopsis.slice(0, synopsisLength) + "..." : res.synopsis
            )
        }

    }

    return (
        <ul className="flex flex-col gap-8">
            {results.map((result, key) => {
                return (
                    <li className="flex flex-row gap-4 sm:gap-7 w-11/12" key={key}>
                        <Link to={`/anime/${result.mal_id}`}>
                            <figure className="w-[120px] sm:w-[250px]">
                                <img src={result.images.webp.large_image_url} alt="Poster" className="rounded sm:rounded-lg w-full" />
                            </figure>
                        </Link>
                        <div className="flex flex-col gap-1 sm:gap-2">
                            <header className="sm:font-bold font-montserrat">
                                <Link to={`/anime/${result.mal_id}`}>
                                    <h1 className="font-bold text-xl sm:text-3xl">{result.title_english ? result.title_english : result.title}</h1>
                                </Link>
                                <div className="text-primary">{result.status}</div>
                            </header>
                            {result.synopsis && 
                                <article className="text-sm sm:text-base">
                                    {
                                        synopsis(result)
                                    }
                                </article>
                            }
                            <p className="text-white text-opacity-50 text-xs sm:text-base">
                                {result.type === "Movie" ? "Movie" : `${result.episodes} Episodes`} | {result.rating} | {result.year}
                            </p>
                            <div className="hidden sm:flex sm:flex-row sm:gap-3 sm:mt-3">
                                <FButton type="single" mode="normal" onClick={() => { navigate(`/anime/${result.mal_id}`) }}><PlayIcon /></FButton>
                                <FButton type="single" mode="invert"><MarkIcon /></FButton>
                            </div>
                        </div>
                    </li>
                )
            })}
        </ul>
    )
}

export default SearchResult;