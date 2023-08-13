import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { findAnime, getTrendingAnime } from "../../lib/anime-api";
import SearchResult from "../components/anime/SearchResult";
import Loading from "../components/anime/Loading";
import TrendList from "../components/anime/lists/TrendList";

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

            setData(null);
            
            setTimeout(async () => {
                const resultData = await findAnime(query);

                setTrend(trendData);
                setData(resultData);
                setError(null);
            }, 1001);
        }
        catch (err) {
            if (err.response) {
                setError(err.response.status);
            }
        }
    }

    useEffect(() => {
        fetchData();
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
        <main className="text-white font-noto-sans base-container flex flex-col gap-10 pb-16">
            <section className="bg-dark-primary rounded-2xl h-[120px] sm:h-[225px] flex flex-col items-center justify-center">
                <h3 className="font-normal sm:text-lg">Search results for</h3>
                <h1 className="sm:text-4xl">"{query}"</h1>
            </section>
            {!error ? <SearchContent /> : <Loading error={error} />}
        </main>
    );
}

export default Search;