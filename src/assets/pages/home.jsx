import React, { useContext, useEffect, useState } from "react";
import Featured from "../components/anime/Featured";
import Loading from "../components/anime/Loading";
import {
    getGenres,
    getLatestEpisode,
    getMultipleAnime,
    getTopAnime,
    getTrendingAnime
} from "../../lib/anime-api";
import { FeaturedContext } from "../context/featuredContext";
import recomData from "../data/custom-anime/recomended.json";
import RowList from "../components/anime/lists/RowList";

function Home () {
    const [statusError, setError] = useState(null);

    const [recomended, setRecommend] = useState(null);

    // Bro are too many 😭️😭️😭️😭️
    const { content, setContent } = useContext(FeaturedContext);
    const {
        hot: hotAnime,
        hotSummary: hotSummaryAnime,
        top: topAnime,
        eps: epsAnime,
        genre: genresAnime,
        airing: airingAnime,
        upcoming: upcomingAnime,
        popular: popularAnime
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
            // still better than yandere simp
            const hot = await getTrendingAnime();
            const top = await getTopAnime();

            const hotSummary = [...hot.data].slice(0, 10);
            
            setContent({ hot, hotSummary, top });
            await new Promise(resolve => setTimeout(resolve, 1500));

            const eps = await getLatestEpisode();
            const genres = await getGenres();
            
            const epsSummary = [...eps.data].slice(0, 25);
            const eps_locked = epsSummary.filter(ep => ep.region_locked == true);
            const eps_unlocked = epsSummary.filter(ep => ep.region_locked == false);
            const eps_filtered = [...eps_unlocked, ...eps_locked];

            const genreSummary = genres.slice(0, 10);

            setContent({ hot, hotSummary, top, eps: eps_filtered, genre: genreSummary });
            await new Promise(resolve => setTimeout(resolve, 1500));

            const airing = await getTopAnime("airing");
            const upcoming = await getTopAnime("upcoming");
            
            setContent({ hot, hotSummary, top, eps: eps_filtered, genre: genreSummary, airing, upcoming });
            await new Promise(resolve => setTimeout(resolve, 1500));

            const popular = await getTopAnime("bypopularity");
            
            setContent({
                hot: hot,
                hotSummary: hotSummary,
                top: top,
                eps: eps_filtered,
                genre: genreSummary,
                airing: airing,
                upcoming: upcoming,
                popular: popular
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
                fetchAnime().then(() => {
                    fetchMultiple();
                });
            }, 800);
        }
        
        return () => { isRequest = true };
    }, []);

    return statusError ? <Loading error={statusError} /> :
        (!hotSummaryAnime ? <Loading>Fetching Data</Loading> : (
        <>
            <Featured data={hotSummaryAnime} />
            <main className="text-white base-container">
                <div className="flex flex-col gap-10 py-5">
                    { hotAnime ?
                        <RowList.Anime title="Hot now 🔥" data={hotAnime.data} /> :
                        <RowList.Anime.Loading title="Hot now 🔥" />
                    }
                    { airingAnime ?
                        <RowList.Anime title="Airing now ✨️" data={airingAnime.data} /> :
                        <RowList.Anime.Loading title="Airing now ✨️" />
                    }
                    { epsAnime ?
                        <RowList.Anime title="Latest Updated Episode 🗣️" data={epsAnime} /> :
                        <RowList.Anime.Loading title="Latest Updated Episode 🗣️" />
                    }
                    { genresAnime ?
                        <RowList.Categories title="By Genres 🤸‍♀️️" data={genresAnime} /> :
                        <Loading>Get Genres</Loading>
                    }
                    { popularAnime ?
                        <RowList.Anime title="Most Popular 🙌" data={popularAnime.data} /> :
                        <RowList.Anime.Loading title="Most Popular 🙌" />
                    }
                    { topAnime ?
                        <RowList.Anime title="Top Anime 🏅️" data={topAnime.data} /> :
                        <RowList.Anime.Loading title="Top Anime 🏅️" />
                    }
                    { upcomingAnime ?
                        <RowList.Anime title="Coming Soon ⏰" data={upcomingAnime.data} /> :
                        <RowList.Anime.Loading title="Coming Soon ⏰" />
                    }
                    { recomended ?
                        <RowList.Anime title="Recommended" data={recomended.data} /> :
                        <RowList.Anime.Loading title="Recommended" />
                    }
                </div>
            </main>
        </>
    ))
}

export default Home;