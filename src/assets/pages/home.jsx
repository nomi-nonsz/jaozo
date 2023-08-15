import React, { useEffect, useState } from "react";
import Featured from "../components/anime/Featured";
import Loading from "../components/anime/Loading";
import { getMultipleAnime, getTopAnime, getTrendingAnime } from "../../lib/anime-api";
import recomData from "../data/custom-anime/recomended.json";
import RowList from "../components/anime/lists/RowList";

function Home () {
    const [recommendAnime, setRecommend] = useState(null);
    const [hotSummaryAnime, setHotSAnime] = useState(null);
    const [hotAnime, sethotAnime] = useState(null);
    const [topAnime, setTop] = useState(null);

    let isRequest = false;

    const fetchAnime = () => {
        setTimeout(() => {
            getTrendingAnime().then(hot => {
                const hotSummary = [...hot.data].slice(0, 10);
                sethotAnime(hot);
                setHotSAnime(hotSummary);

                getTopAnime().then(top => {
                    setTop(top);
                })
            });
            
            getMultipleAnime(recomData.mal_ids).then(recommended => { setRecommend(recommended); });
        }, 800);
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
                    <div className="flex flex-col gap-5 py-5">
                        <RowList title="Hot now 🔥" data={hotAnime.data} />
                        { topAnime ?
                            <RowList title="Top Anime 👍" data={topAnime.data} /> :
                            <Loading>Get anime data (this takes a few minutes)</Loading>
                        }
                        { recommendAnime ?
                            <RowList title="Recommendation 👍" data={recommendAnime.data} /> :
                            <Loading>Get anime data (this takes a few minutes cuz rate limited)</Loading>
                        }
                    </div>
                </>
            )}
        </main>
    )
}

export default Home;