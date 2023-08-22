import React, { useEffect, useState } from "react";
import LandingBanner from "../components/anime/banner/LandingBanner";
import ColList from "../components/anime/lists/ColList";
import { getFullGenres, getGenres, getTrendingAnime } from "../../lib/anime-api";
import featuredGenres from  "../data/custom-banner/genres.json";
import BurriedLists from "../components/anime/lists/BurriedList";
import { ReactComponent as LeftArrow } from "../icons/arrow-left.svg";
import SearchBar from "../components/SearchBar";

function Genres () {
    let isRequest = false;

    const [popularGenres, setGenres] = useState(null);
    const [allGenres, setAll] = useState(null);
    const [mostGenres, setMost] = useState(null);
    const [trendingAnime, setAnime] = useState(null);

    const [queryGenres, setQuery] = useState(null);

    const handleSearch = (e, query) => {
        e.preventDefault();
        setQuery(query);
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
                    {trendingAnime.map((anime, key) => {
                        return <ColList.LongAnime anime={anime} key={key} />
                    })}
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
            <div className="flex flex-col gap-6">
                <h1 className="font-montserrat text-2xl">Popular Genres</h1>
                { popularGenres && 
                <LandingBanner.ShortChategories data={popularGenres} /> }
            </div>
            <div className="grid grid-cols-10 gap-10">
                <div className="flex flex-col gap-6 col-span-8">
                    <h1 className="font-montserrat text-2xl">Genres from trending anime</h1>
                    { trendingAnime && (
                        <DoropAnime />
                    )}
                </div>
                <div className="flex flex-col gap-6 col-span-2">
                    <h1 className="font-montserrat text-2xl">Most Genres</h1>
                    <div className="flex flex-col gap-3">
                        { mostGenres && (
                            mostGenres.map(({ name, count, url }, key) => {
                                return <BurriedLists.List name={name} count={count} url={url} key={key} />
                            })
                        ) }
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-10 gap-10">
                <div className="flex flex-col gap-8 col-start-2 col-span-8">
                    <h1 className="font-montserrat text-center text-2xl">Browse All Genres</h1>
                    <div className="flex flex-col gap-3 text-center">
                        <SearchBar placeholder="Find genre" theme="darked" handleSearch={handleSearch} />
                        <p className="opacity-30">// bro actually you don't need a search bar because all genres are fewer</p>
                    </div>
                    { allGenres && <ListGenres /> }
                </div>
            </div>
        </main>
    )
}

export default Genres;