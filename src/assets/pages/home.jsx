import React, { useEffect, useState } from "react";
import Featured from "../components/anime/Featured";
import Loading from "../components/anime/Loading";
import { getTrendingAnime } from "../../lib/anime-api";
import RowList from "../components/anime/lists/RowList";

function Home () {
    const [hotSummaryAnime, setHotSAnime] = useState(null);
    const [hotAnime, sethotAnime] = useState(null);

    const fetchAnime = async () => {
        try {
            const hot = await getTrendingAnime();

            const hotSummary = [...hot.data].slice(0, 10);

            setHotSAnime(hotSummary);
            sethotAnime(hot.data);
        } catch (error) {
            // console.error(error);
        }
    }

    useEffect(() => {
        fetchAnime();
    }, []);

    return (
        <main className="text-white base-container">
            { !hotSummaryAnime && !hotAnime ? <Loading>Fetching Data</Loading> : (
                <>
                    <Featured data={hotSummaryAnime} />
                    <div className="flex flex-col">
                        <RowList title="Hot now 🔥" data={hotAnime} />
                    </div>
                </>
            )}
        </main>
    )
}

export default Home;