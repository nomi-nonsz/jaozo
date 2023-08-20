import React, { useEffect, useState } from "react";
import LandingBanner from "../components/anime/banner/LandingBanner";
import { getFullGenres, getGenres } from "../../lib/anime-api";
import featuredGenres from  "../data/custom-banner/genres.json";

function Genres () {
    let isRequest = false;

    const [popularGenres, setGenres] = useState(null);

    const fetchGenres = async () => {
        try {
            const genres = await getFullGenres();
            const featured = [];

            featuredGenres.forEach((feat) => {
                for (let genre of genres) {
                    if (feat.mal_id == genre.mal_id) {
                        const countedGenre = {...genre};

                        const dozens = [...`${genre.count}`]
                            .map((c, index) => {
                                return index === 0 ? 1 : 0;
                            })
                            .join("")

                        const count = parseFloat(dozens);
                        const rounded = Math.round(genre.count / count) * count;
                        
                        countedGenre.count = `${rounded}+`;
                        
                        featured.push({ ...countedGenre, img: feat.img });
                    }
                }
            })

            setGenres(featured);
            console.log(featured);
        }
        catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        if (!isRequest) {
            fetchGenres();
        }

        return () => { isRequest = true; }
    }, []);

    return (
        <main className="text-white base-container py-10">
            <div className="flex flex-col gap-6">
                <h1 className="font-montserrat text-2xl">Popular Genres</h1>
                { popularGenres && 
                <LandingBanner.ShortChategories data={popularGenres} /> }
            </div>
        </main>
    )
}

export default Genres;