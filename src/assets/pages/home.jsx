import React, { useEffect, useState } from "react";
import Featured from "../components/anime/Featured";
import Loading from "../components/anime/Loading";
import { getMultipleAnime, getTrendingAnime } from "../../lib/anime-api";
import recomData from "../data/custom-anime/recomended.json";
import RowList from "../components/anime/lists/RowList";

function Home () {
    const [recommendAnime, setRecommend] = useState(null);
    const [hotSummaryAnime, setHotSAnime] = useState(null);
    const [hotAnime, sethotAnime] = useState(null);

    let isRequest = false;

    const fetchAnime = () => {
        getTrendingAnime().then(hot => {
            const hotSummary = [...hot.data].slice(0, 10);
            setHotSAnime(hotSummary);
        });
            
        getMultipleAnime(recomData.mal_ids).then(recommended => setRecommend(recommended));
    }

    useEffect(() => {
        if (isRequest)
            fetchAnime();

        return () => { isRequest = true };
    }, []);

    return (
        <main className="text-white base-container">
            { !hotSummaryAnime && !hotAnime ? <Loading>Fetching Data</Loading> : (
                <>
                    <Featured data={hotSummaryAnime} />
                    <div className="flex flex-col">
                        { recommendAnime && <RowList title="Recommendation 👍" data={recommendAnime} /> }
                        <RowList title="Hot now 🔥" data={hotAnime} />
                    </div>
                </>
            )}
        </main>
    )
}

export default Home;