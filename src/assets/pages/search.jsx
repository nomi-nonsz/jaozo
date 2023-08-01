import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { findAnime, getTrendingAnime } from "../../lib/anime-api";
import SearchResult from "../components/anime/SearchResult";
import Loading from "../components/anime/Loading";

function Search () {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const query = searchParams.get("query");

    const [animeData, setData] = useState(null);
    const [trendAnime, setTrend] = useState(null);

    useEffect(() => {
        findAnime(query).then(res => {
            setData(res);
        });
    }, [query]);

    useEffect(() => {
        getTrendingAnime().then(res => {
            setTrend(res);
        });
    }, []);

    return (
        <main className="text-white font-noto-sans base-container flex flex-col gap-10">
            <section className="bg-dark-primary rounded-2xl h-[225px] flex flex-col items-center justify-center">
                <h3 className="text-lg">Search results for</h3>
                <h1 className="text-4xl">"{query}"</h1>
            </section>
            <section className="grid grid-cols-4 gap-4">
                <div className="col-span-3">
                    {animeData ? <SearchResult animeData={animeData} /> : <Loading>Finding Anime</Loading>}
                </div>
                <aside className="flex flex-col gap-3">
                    <h2 className="text-xl">You might be interested</h2>
                    <ol className="list-decimal flex flex-col gap-2 text-white text-opacity-60 text-sm">
                        {trendAnime && trendAnime.data.map((trend, key) => {
                            return (
                                <li key={key} className="ps-1 hover:underline">
                                    <Link to={`/anime/${trend.mal_id}`}>
                                        {trend.title_english ? trend.title_english : trend.title}
                                    </Link>
                                </li>
                            )
                        })}
                    </ol>
                </aside>
            </section>
        </main>
    );
}

export default Search;