import React, { useContext, useEffect, useState } from "react";
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
import { FeaturedContext } from "../context/featuredContext";
import recomData from "../data/custom-anime/recomended.json";
import RowList from "../components/anime/lists/RowList";

function Home () {
    const [statusError, setError] = useState(null);

    // Bro is too many 😭️😭️😭️😭️
    const { content, setContent } = useContext(FeaturedContext);
    const {
        hot: hotAnime,
        hotSummary: hotSummaryAnime,
        top: topAnime,
        eps: epsAnime,
        genre: genresAnime,
        airing: airingAnime
    } = content;

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
            await new Promise(resolve => setTimeout(resolve, 1000));
            const eps = await getLatestEpisode();
            const genres = await getGenres();
            await new Promise(resolve => setTimeout(resolve, 1000));
            const airing = await getTopAiring();
            
            const hotSummary = [...hot.data].slice(0, 10);
            
            const epsSummary = [...eps.data].slice(0, 25);
            const eps_locked = epsSummary.filter(ep => ep.region_locked == true);
            const eps_unlocked = epsSummary.filter(ep => ep.region_locked == false);
            const eps_filtered = [...eps_unlocked, ...eps_locked];
            
            const genreSummary = genres.slice(0, 10);

            setContent({
                hot: hot,
                hotSummary: hotSummary,
                top: top,
                eps: eps_filtered,
                genre: genreSummary,
                airing: airing
            });
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
        const isDataExist = hotAnime && hotSummaryAnime && topAnime && epsAnime && genresAnime && airingAnime;

        if (isRequest && !isDataExist) {
            setTimeout(() => {
                fetchAnime();
                // fetchMultiple();
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
                    </div>
                </>
            ))}
        </main>
    )
}

export default Home;