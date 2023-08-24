import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getAnimeByGenre, getGenreByName, getPopularAnimeByGenre } from "../../lib/anime-api";
import LandingBanner from "../components/anime/banner/LandingBanner";
import ColList from "../components/anime/lists/ColList";
import MogureList from "../components/anime/lists/MogureList";

function OneGenre () {
    const { name: genreParam } = useParams();
    const [genre, setGenre] = useState(null);
    const [anime, setAnime] = useState(null);
    const [allAnime, setAll] = useState(null);

    const fetchGenre = async () => {
        try {
            await new Promise(resolve => setTimeout(resolve, 500));
            const foundedGenre = await getGenreByName(genreParam);
            const foundedAnime = await getPopularAnimeByGenre(foundedGenre.mal_id);

            await new Promise(resolve => setTimeout(resolve, 1000));
            const foundedAll = await getAnimeByGenre(foundedGenre.mal_id);

            // console.log({...foundedGenre, anime: foundedAnime[0]});

            setGenre({...foundedGenre, anime: foundedAnime[0]});
            setAll(foundedAll);
            setAnime(foundedAnime);
        }
        catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        setGenre(null);
        setAll(null)
        setAnime(null)
        fetchGenre();
    }, [genreParam]);

    return (
        <div className="text-white base-container py-10 flex flex-col gap-14">
            { genre ?
            <LandingBanner.OneCategories data={genre} /> : <LandingBanner.OneCategories.Loading />
            }
            <div className="grid grid-cols-10 gap-12">
                <div className="col-span-7 flex flex-col gap-6">
                    <h1 className="font-montserrat text-2xl">Browse Anime</h1>
                    <div className="grid grid-cols-6 gap-x-6 gap-y-14">
                        { allAnime ?
                        allAnime.map((nimej, key) => {
                            return <div className="col-span-2"><ColList.Anime anime={nimej} key={key} /></div>
                        })
                        :
                        [...Array(6)].map((v) => <ColList.Anime />)}
                    </div>
                </div>
                <div className="col-span-3 flex flex-col gap-6">
                    <h1 className="font-montserrat text-2xl">Popular {genre && genre.name}</h1>
                    <div className="flex flex-col gap-8">
                        { anime ? anime.map((nimej, key) => {
                            return <MogureList.Anime anime={nimej} key={key} />
                        })
                        :
                        [...Array(8)].map(() => <MogureList.Loading />)
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OneGenre;