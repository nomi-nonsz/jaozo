import React, { useEffect, useState } from "react";
import Featured from "../components/anime/Featured";
import Loading from "../components/anime/Loading";
import { getLatestEpisode, getMultipleAnime, getTopAnime, getTrendingAnime } from "../../lib/anime-api";
import recomData from "../data/custom-anime/recomended.json";
import RowList from "../components/anime/lists/RowList";

function Home () {
    const [recommendAnime, setRecommend] = useState(null);
    const [hotSummaryAnime, setHotSAnime] = useState(null);
    const [hotAnime, sethotAnime] = useState(null);
    const [topAnime, setTop] = useState(null);
    const [epsAnime, setEps] = useState(null);

    let isRequest = false;

    const fetchAnime = async () => {
        try {
            const hot = await getTrendingAnime();
            const top = await getTopAnime();
            await new Promise(resolve => setTimeout(resolve, 600));
            const eps = await getLatestEpisode();

            const hotSummary = [...hot.data].slice(0, 10);

            const epsSummary = [...eps.data].slice(0, 25);
            const eps_locked = epsSummary.filter(ep => ep.region_locked == true);
            const eps_unlocked = epsSummary.filter(ep => ep.region_locked == false);
            const eps_filtered = [...eps_unlocked, ...eps_locked];

            sethotAnime(hot);
            setHotSAnime(hotSummary);
            setTop(top);
            setEps(eps_filtered);
        }
        catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        if (isRequest) {
            setTimeout(() => {     
                fetchAnime();
                getMultipleAnime(recomData.mal_ids).then(recommended => { setRecommend(recommended); });
            }, 800);
        }

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
                            <RowList title="Top Anime 🏅️" data={topAnime.data} /> :
                            <Loading>Get anime data</Loading>
                        }
                        { epsAnime ?
                            <RowList title="Latest Updated Episode 🗣️" data={epsAnime} /> :
                            <Loading>Get anime data</Loading>
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