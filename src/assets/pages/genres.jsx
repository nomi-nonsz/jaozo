import React, { useEffect, useState } from "react";
import LandingBanner from "../components/anime/banner/LandingBanner";
import ColList from "../components/anime/lists/ColList";
import { getFullGenres, getGenres, getTrendingAnime } from "../../lib/anime-api";
import featuredGenres from  "../data/custom-banner/genres.json";
import BurriedLists from "../components/anime/lists/BurriedList";
import { ReactComponent as LeftArrow } from "../icons/arrow-left.svg";
import SearchBar from "../components/SearchBar";
import Loading from "../components/anime/Loading";
import Section from "../components/sections/Section";
import FefoGrid from "../components/sections/FefoGrids";
import Header from "../components/sections/Header";

function Genres () {
    let isRequest = false;

    const [statusError, setError] = useState(null);

    const [popularGenres, setGenres] = useState(null);
    const [allGenres, setAll] = useState(null);
    const [mostGenres, setMost] = useState(null);
    const [trendingAnime, setAnime] = useState(null);

    const [queryGenres, setQuery] = useState(null);

    const handleSearch = (e, query) => {
        e.preventDefault();
        setQuery(query);
    }

    const catchError = (error) => {
        if (error.response) {
            setError(error.response.status);
        }
    }

    const fetchGenres = async () => {
        try {
            const genres = await getFullGenres();
            const anime = await getTrendingAnime();

            genres.sort((a, b) => {
                const nameA = a.name.toLowerCase();
                const nameB = b.name.toLowerCase();
        
                if (nameA < nameB) {
                    return -1;
                }
                if (nameA > nameB) {
                    return 1;
                }
                return 0;
            })

            const featured = [];
            const most = [...genres]
                .sort((a, b) => { return b.count - a.count; })
                .slice(0, 10)

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
                        
                        featured.push({
                            ...countedGenre,
                            img: feat.img,
                            anime: feat.anime
                        });
                    }
                }
            })

            const animeSummary = anime.data.slice(0, 10);

            setGenres(featured);
            setAll(genres);
            setMost(most);
            setAnime(animeSummary);

            console.log(featured);
            console.log(anime);
        }
        catch (error) {
            console.log(error);
            catchError(error);
        }
    }

    useEffect(() => {
        if (queryGenres) {
            const findedData = [...allGenres].filter(({name}) => {
                return name.toLowerCase().includes(queryGenres);
            })
    
            console.log(findedData);
        }
    }, [queryGenres]);

    useEffect(() => {
        if (!isRequest) {
            fetchGenres();
        }

        return () => { isRequest = true; }
    }, []);

    function ListGenres () {
        return (
            <div className="grid grid-cols-8 gap-4">
                {
                    queryGenres && queryGenres !== "" ?
                    allGenres
                        .filter(({name}) => {
                            const query = queryGenres.toLowerCase();
                            return name.toLowerCase().includes(query);
                        })
                        .map(({ name, count, url }, key) => {
                            return <BurriedLists.List
                                name={name}
                                count={count}
                                url={url}
                                key={key}
                                className="col-span-2"
                            />
                        })
                    :
                    allGenres
                        .map(({ name, count, url }, key) => {
                            return <BurriedLists.List
                                name={name}
                                count={count}
                                url={url}
                                key={key}
                                className="col-span-2"
                            />
                        })
                }
            </div>
        )
    }

    function DoropAnime () {
        const [isDroppin, setDrop] = useState(false);

        const toggleDroppin = () => {
            setDrop(!isDroppin);
        }

        return (
            <>
                <div className={"relative before:content-[''] before:pointer-events-none before:z-10 before:absolute before:w-full before:bottom-0 before:h-1/4 before:bg-gradient-to-b before:from-transparent before:to-yawn-primary overflow-y-hidden " + (isDroppin ? "h-auto before:hidden" : "h-[720px] before:block")}>
                    <div className="grid grid-cols-2 gap-8">
                    {trendingAnime ? trendingAnime.map((anime, key) => {
                        return <ColList.LongAnime anime={anime} key={key} />
                    }) :
                    [...Array(4)].map((idk, key) => <ColList.LongAnime.Loading key={key} />)
                    }
                    </div>
                </div>
                <button className="px-12 py-3 mx-auto bg-border-primary bg-opacity-10 hover:bg-opacity-20 rounded-full w-fi transition" onClick={toggleDroppin}>
                    <LeftArrow className={"w-4 -rotate-90 fill-yolo-primary transition " + (isDroppin && "rotate-90")} />
                </button>
            </>
        )
    }

    return (
        <main className="text-white base-container py-10 flex flex-col gap-14">
            {!statusError ? (
                <>
                <Section>
                    <Header>Popular Genres</Header>
                    { popularGenres ? 
                    <LandingBanner.ShortChategories data={popularGenres} /> :
                    <LandingBanner.ShortChategories.Loading />}
                </Section>
                <FefoGrid gap={10}>
                    <div className="flex flex-col gap-6 col-span-8">
                        <Header>Genres from trending anime</Header>
                        <DoropAnime />
                    </div>
                    <div className="flex flex-col gap-6 col-span-2">
                        <Header>Most Genres</Header>
                        <div className="flex flex-col gap-3">
                            { mostGenres ? (
                                mostGenres.map(({ name, count, url }, key) => {
                                    return <BurriedLists.List name={name} count={count} url={url} key={key} />
                                }))
                                :
                                [...Array(6)].map((idk, key) => <BurriedLists.Loading key={key} />)
                            }
                        </div>
                    </div>
                </FefoGrid>
                <FefoGrid gap={10}>
                    <div className="flex flex-col gap-8 col-start-2 col-span-8">
                        <Header className="text-center">Browse All Genres</Header>
                        <div className="flex flex-col gap-3 text-center">
                            <SearchBar placeholder="Find genre" theme="darked" handleSearch={handleSearch} />
                            <p className="opacity-30">// bro actually you don't need a search bar because all genres are fewer</p>
                        </div>
                        { allGenres && <ListGenres /> }
                    </div>
                </FefoGrid>
                </>
            )
            :
            <Loading error={statusError} /> }
        </main>
    )
}

export default Genres;