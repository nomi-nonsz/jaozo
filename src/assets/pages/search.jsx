import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { findAnime, getTrendingAnime } from "../../lib/anime-api";
import SearchResult from "../components/anime/SearchResult";
import Loading from "../components/anime/Loading";
import TrendList from "../components/anime/lists/TrendList";

function Search () {
    let isRequest = false;

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const query = searchParams.get("query");

    const [animeData, setData] = useState(null);
    const [trendAnime, setTrend] = useState(null);
    const [error, setError] = useState(null);

    async function fetchData () {
        setData(null);
        
        try {
            const trendData = await getTrendingAnime();
            await new Promise(resolve => setTimeout(resolve, 800));
            const resultData = await findAnime(query);

            const trendSummary = trendData.data.slice(0, 10);

            setTrend(trendSummary);
            setData(resultData);
            setError(null);
        }
        catch (err) {
            if (err.response) {
                setError(err.response.status);
            }
        }
    }

    useEffect(() => {
        if (!isRequest) fetchData();

        return () => { isRequest = true; }
    }, [query]);

    function SearchContent () {
        return (
            <section className="lg:grid lg:grid-cols-4 lg:gap-4">
                <div className="lg:col-span-3">
                    {animeData ? <SearchResult animeData={animeData} /> : <Loading>Finding Anime</Loading>}
                </div>
                <aside className="hidden lg:flex lg:flex-col lg:gap-3">
                    <h2 className="text-xl">You might be interested</h2>
                    {trendAnime && <TrendList trendAnime={trendAnime} />}
                </aside>
            </section>
        )
    }

    return (
        <main className="text-white font-noto-sans base-container flex flex-col gap-4 sm:gap-10 pb-8 sm:pb-16">
            <section className="bg-dark-primary rounded-2xl h-[120px] sm:h-[225px] flex flex-col items-center justify-center">
                <div className="font-normal text-sm sm:text-lg">Search results for</div>
                <h1 className="text-lg sm:text-4xl">"{query}"</h1>
            </section>
            {!error ? <SearchContent /> : <Loading error={error} />}
        </main>
    );
}

export default Search;