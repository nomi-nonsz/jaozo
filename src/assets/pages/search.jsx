import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { findAnime, getTrendingAnime } from "../../lib/anime-api";
import SearchResult from "../components/anime/SearchResult";
import Loading from "../components/anime/Loading";
import TrendList from "../components/anime/TrendList";

function Search () {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const query = searchParams.get("query");

    const [animeData, setData] = useState(null);
    const [trendAnime, setTrend] = useState(null);

    const [error, setError] = useState(null);

    async function fetchData () {
        try {
            const trendData = await getTrendingAnime();
            
            setTimeout(async () => {
                const resultData = await findAnime(query);

                setTrend(trendData);
                setData(resultData);
            }, 1001);
        }
        catch (err) {
            if (err.response) {
                setError(err.response.status);
            }
        }
    }

    useEffect(() => {
        setData(null);
        fetchData();
    }, [query]);

    function SearchContent () {
        return (
            <section className="grid grid-cols-4 gap-4">
                <div className="col-span-3">
                    {animeData ? <SearchResult animeData={animeData} /> : <Loading>Finding Anime</Loading>}
                </div>
                <aside className="flex flex-col gap-3">
                    <h2 className="text-xl">You might be interested</h2>
                    {trendAnime && <TrendList trendAnime={trendAnime} />}
                </aside>
            </section>
        )
    }

    return (
        <main className="text-white font-noto-sans base-container flex flex-col gap-10 pb-16">
            <section className="bg-dark-primary rounded-2xl h-[225px] flex flex-col items-center justify-center">
                <h3 className="text-lg">Search results for</h3>
                <h1 className="text-4xl">"{query}"</h1>
            </section>
            {!error ? <SearchContent /> : <Loading error={error} />}
        </main>
    );
}

export default Search;