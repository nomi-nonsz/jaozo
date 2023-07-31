import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getAnime, getEpisodeById } from '../../lib/anime-api';
import AnimeContent from '../components/anime/AnimeContent';
import Loading from '../components/anime/Loading';

function Anime () {
    const { animeId } = useParams();
    const [animeData, setData] = useState(null);
    const [episodeData, setEpisode] = useState(null);

    useEffect(() => {
        getAnime(animeId).then(res => {
            setData(res);
        });

        getEpisodeById(animeId).then(res => {
            setEpisode(res);
        });
    }, [animeId]);

    return (
        <main className="text-white font-noto-sans base-container">
            { animeData && episodeData ? <AnimeContent animeData={animeData} episodeData={episodeData} /> : <Loading /> }    
        </main>
    )
}

export default Anime;