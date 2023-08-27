import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { getAnimeByGenre, getGenreByName, getPopularAnimeByGenre } from "../../lib/anime-api";
import LandingBanner from "../components/anime/banner/LandingBanner";
import ColList from "../components/anime/lists/ColList";
import MogureList from "../components/anime/lists/MogureList";
import NotFound404 from "./NotFound404";
import PageButtons from "../components/buttons/PageButton";
import FefoGrid from "../components/sections/FefoGrids";
import Section from "../components/sections/Section";
import Header from "../components/sections/Header";

function OneGenre () {
    const { name: genreParam } = useParams();
    const location = useLocation();
    const pageParams = new URLSearchParams(location.search);
    const page = pageParams.get("page");

    const [found, setFound] = useState(null);
    const [genre, setGenre] = useState(null);
    const [anime, setAnime] = useState(null);

    const [allAnime, setAll] = useState(null);
    const [pagination, setPage] = useState(null);

    const fetchGenre = async () => {
        try {
            await new Promise(resolve => setTimeout(resolve, 500));
            const foundedGenre = await getGenreByName(genreParam);
            const foundedAnime = await getPopularAnimeByGenre(foundedGenre.mal_id);

            setFound(foundedGenre.mal_id ? true : false);

            await new Promise(resolve => setTimeout(resolve, 1000));
            const foundedAll = await getAnimeByGenre(foundedGenre.mal_id, page);

            // console.log({...foundedGenre, anime: foundedAnime[0]});
            // console.log(foundedGenre);
            // console.log(!foundedGenre.mal_id);

            setGenre({...foundedGenre, anime: foundedAnime[0]});
            setPage(foundedAll.pagination);
            setAll(foundedAll.data);
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
    }, [genreParam, page]);

    if (found != null && found == false) {
        return <NotFound404 />
    }

    return (
        <div className="text-white base-container py-10 flex flex-col gap-14">
            { genre ?
            <LandingBanner.OneCategories data={genre} /> : <LandingBanner.OneCategories.Loading />
            }
            <FefoGrid gap={20}>
                <Section className={"col-span-7"}>
                    <Header>Browse Anime</Header>
                    <div className="grid grid-cols-6 gap-x-6 gap-y-14">
                        { allAnime ?
                        allAnime.map((nimej, key) => {
                            return <div className="col-span-2"><ColList.Anime anime={nimej} key={key} /></div>
                        })
                        :
                        [...Array(6)].map((v) => <ColList.Anime />)}
                    </div>
                    { pagination &&
                        <div className="mt-20">
                            <PageButtons pagination={pagination} />
                        </div>
                    }
                </Section>
                <Section className={"col-span-3"}>
                    <Header>Popular {genre && genre.name}</Header>
                    <div className="flex flex-col gap-8">
                        { anime ? anime.map((nimej, key) => {
                            return <MogureList.Anime anime={nimej} key={key} />
                        })
                        :
                        [...Array(8)].map(() => <MogureList.Loading />)
                        }
                    </div>
                </Section>
            </FefoGrid>
        </div>
    )
}

export default OneGenre;