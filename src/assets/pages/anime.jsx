import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getAnime } from '../../lib/anime-api';
import AnimeContent from '../components/anime/AnimeContent';
import Loading from '../components/anime/Loading';

function Anime () {
    const { animeId } = useParams();
    const [animeData, setData] = useState(null);

    useEffect(() => {
        getAnime(animeId)
            .then(res => {
                setData(res);
            })
    }, [animeId]);

    return (
        <main className="text-white font-noto-sans base-container">
            { animeData ? <AnimeContent animeData={animeData} /> : <Loading /> }    
        </main>
    )
}

export default Anime;