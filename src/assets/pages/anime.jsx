import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getAnime, getEpisodeById, getRecommendByAnime } from '../../lib/anime-api';
import AnimeContent from '../components/anime/AnimeContent';
import Loading from '../components/anime/Loading';

function Anime () {
    const { animeId } = useParams();
    const [dataExist, setExist] = useState(false);
    const [animeData, setData] = useState(null);
    const [episodeData, setEpisode] = useState(null);
    const [recommendData, setRecommend] = useState(null);

    const fetchAnime = async () => {
        const anime = await getAnime(animeId);
        const episodes = await getEpisodeById(animeId);
        const recommend = await getRecommendByAnime(animeId);

        setData(anime);
        setEpisode(episodes);
        setRecommend(recommend);
    }

    useEffect(() => {
        fetchAnime();
    }, [animeId]);

    useEffect(() => {
        if (animeData && episodeData && recommendData) {
            setExist(true);
        }
    }, [animeData, episodeData, recommendData]);

    return (
        <main className="text-white font-noto-sans base-container pb-16">
            { dataExist ? <AnimeContent animeData={animeData} episodeData={episodeData} recommendData={recommendData} /> : <Loading>Fetching Data</Loading> }    
        </main>
    )
}

export default Anime;