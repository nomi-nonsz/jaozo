import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getGenreByName, getPopularAnimeByGenre } from "../../lib/anime-api";
import LandingBanner from "../components/anime/banner/LandingBanner";

function OneGenre () {
    const { name: genreParam } = useParams();
    const [genre, setGenre] = useState(null);
    const [anime, setAnime] = useState(null);

    const fetchGenre = async () => {
        try {
            await new Promise(resolve => setTimeout(resolve, 500));
            const foundedGenre = await getGenreByName(genreParam);
            const foundedAnime = await getPopularAnimeByGenre(foundedGenre.mal_id);

            // console.log({...foundedGenre, anime: foundedAnime[0]});

            setGenre({...foundedGenre, anime: foundedAnime[0]});
            setAnime(anime);
        }
        catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        setGenre(null);
        fetchGenre();
    }, [genreParam]);

    return (
        <div className="text-white base-container py-10 flex flex-col gap-14">
            { genre ?
            <LandingBanner.OneCategories data={genre} /> : <LandingBanner.OneCategories.Loading />
            }
        </div>
    )
}

export default OneGenre;