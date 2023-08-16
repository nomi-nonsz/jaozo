import React, { useEffect, useState } from "react";
import Featured from "../components/anime/Featured";
import Loading from "../components/anime/Loading";
import {
    getGenres,
    getLatestEpisode,
    getMultipleAnime,
    getTopAnime,
    getTrendingAnime,
    getTopAiring
} from "../../lib/anime-api";
import recomData from "../data/custom-anime/recomended.json";
import RowList from "../components/anime/lists/RowList";

function Home () {
    const [statusError, setError] = useState(null);

    // Bro is too many 😭️😭️😭️😭️
    const [recommendAnime, setRecommend] = useState(null);
    const [hotSummaryAnime, setHotSAnime] = useState(null);
    const [hotAnime, sethotAnime] = useState(null);
    const [topAnime, setTop] = useState(null);
    const [epsAnime, setEps] = useState(null);
    const [genresAnime, setGenres] = useState(null);
    const [airingAnime, setAiring] = useState(null);

    let isRequest = false;

    const catchError = (error) => {
        if (error.response) {
            setError(error.response.status);
        }
        else if (error.code) {
            if (error.code === "ERR_NETWORK") {
                setError(0);
            }
        }
    }

    const fetchAnime = async () => {
        try {
            // i got rate limited fr 💀️💀️💀️
            const hot = await getTrendingAnime();
            const top = await getTopAnime();
            await new Promise(resolve => setTimeout(resolve, 800));
            const eps = await getLatestEpisode();
            const genres = await getGenres();
            await new Promise(resolve => setTimeout(resolve, 800));
            const airing = await getTopAiring();
            
            const hotSummary = [...hot.data].slice(0, 10);
            
            const epsSummary = [...eps.data].slice(0, 25);
            const eps_locked = epsSummary.filter(ep => ep.region_locked == true);
            const eps_unlocked = epsSummary.filter(ep => ep.region_locked == false);
            const eps_filtered = [...eps_unlocked, ...eps_locked];
            
            const genreSummary = genres.slice(0, 10);
            
            sethotAnime(hot);
            setHotSAnime(hotSummary);
            setTop(top);
            setEps(eps_filtered);
            setGenres(genreSummary);
            setAiring(airing);
        }
        catch (error) {
            catchError(error);
        }
    }

    const fetchMultiple = async () => {
        try {
            const recommended = await getMultipleAnime(recomData.mal_ids);
            
            setRecommend(recommended);
        }
        catch (error) {
            catchError(error);
        }
    }
    
    useEffect(() => {
        if (isRequest) {
            setTimeout(() => {     
                fetchAnime();
                fetchMultiple();
            }, 800);
        }
        
        return () => { isRequest = true };
    }, []);

    return (
        <main className="text-white base-container">
            { statusError ? <Loading error={statusError} /> :
            (!hotSummaryAnime && !hotAnime ? <Loading>Fetching Data</Loading> : (
                <>
                    <Featured data={hotSummaryAnime} />
                    <div className="flex flex-col gap-10 py-5">
                        <RowList title="Hot now 🔥" model="anime" data={hotAnime.data} />
                        { airingAnime ?
                            <RowList title="Airing now ✨️" model="anime" data={airingAnime.data} /> :
                            <Loading>Get anime data</Loading>
                        }
                        { epsAnime ?
                            <RowList title="Latest Updated Episode 🗣️" model="anime" data={epsAnime} /> :
                            <Loading>Get anime data</Loading>
                        }
                        { genresAnime ?
                            <RowList title="By Genres 🤸‍♀️️" model="categories" data={genresAnime} /> :
                            <Loading>Get anime data</Loading>
                        }
                        { topAnime ?
                            <RowList title="Top Anime 🏅️" model="anime" data={topAnime.data} /> :
                            <Loading>Get anime data</Loading>
                        }
                        { recommendAnime ?
                            <RowList title="Recommendation 👍" model="anime" data={recommendAnime.data} /> :
                            <Loading>Get anime data (this takes a few minutes cuz rate limited)</Loading>
                        }
                    </div>
                </>
            ))}
        </main>
    )
}

export default Home;