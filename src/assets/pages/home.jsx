import React, { useEffect, useState } from "react";
import Featured from "../components/anime/Featured";
import Loading from "../components/anime/Loading";
import { getTrendingAnime } from "../../lib/anime-api";

function Home () {
    const [hotAnime, setHostAnime] = useState(null);

    const fetchAnime = async () => {
        try {
            const hot = await getTrendingAnime();

            setHostAnime(hot);
        } catch (error) {
            // console.error(error);
        }
    }

    useEffect(() => {
        fetchAnime();
    }, []);

    return (
        <main className="text-white base-container">
            { !hotAnime ? <Loading>Fetching Data</Loading> : <Featured data={hotAnime} /> }
        </main>
    )
}

export default Home;