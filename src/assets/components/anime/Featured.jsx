import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import FButton from '../buttons/FButton';
import { ReactComponent as PlayIcon } from '../../icons/play.svg';
import { ReactComponent as MarkIcon } from '../../icons/mark.svg';
import LeftArrow from "../buttons/arrow/LeftArrow";
import RightArrow from "../buttons/arrow/RightArrow";

function Featured ({ data }) {
    const anime = data;
    const navigate = useNavigate();
    const [index, setIndex] = useState(0);

    const next = () => {
        const nextIndex = index >= anime.length - 1 ? 0 : index + 1;
        setIndex(nextIndex);
    }
    const prev = () => {
        const nextIndex = index <= 0 ? anime.length - 1 : index - 1;
        setIndex(nextIndex);
    }

    return (
        <header className="text-white h-[80vh] bg-cover" style={{ backgroundImage: `url(${anime[index].trailer.images.maximum_image_url})` }}>
            <div className="absolute backdrop-blur-2xl w-full h-full left-0 top-0 bg-gradient-to-b from-transparent to-yawn-primary"></div>
            <div className="absolute w-full h-full left-0 top-0 bg-yawn-primary bg-opacity-50"></div>
            <div className="absolute base-container left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                <div className="grid grid-cols-10">
                    <div className="col-span-3 relative">
                        <LeftArrow onClick={prev} />
                        <Link className="group" to={"/anime/" + anime[index].mal_id} title={anime[index].title}>
                            <figure className="relative">
                                <img className="rounded-xl opacity-0" src={anime[index].images.webp.large_image_url} alt="" />
                                <img className="rounded-xl absolute top-0 left-0 blur-[64px] opacity-40 group-hover:opacity-60 group-hover:scale-105 transition" src={anime[index].images.webp.large_image_url} alt="" />
                                <img className="rounded-xl absolute top-0 left-0" src={anime[index].images.webp.large_image_url} alt="" />
                            </figure>
                        </Link>
                        <RightArrow onClick={next} />
                    </div>
                    <div className="col-span-1"></div>
                    <div className="col-span-6 flex items-center">
                        <div className="flex flex-col gap-5">
                            <header className="flex flex-col gap-2">
                                <h1 className="text-3xl font-poppins">
                                    { anime[index].title_english ? anime[index].title_english : anime[index].title }
                                </h1>
                                <div className="flex gap-3 items-center">
                                    <h3 className="font-poppins text-lg text-border-primary">{anime[index].status}</h3>
                                    <div className="text-white text-opacity-80">{anime[index].episodes ? anime[index].episodes : "No"} Episodes</div>
                                </div>
                            </header>
                            <div className="w-3/4">
                                {anime[index].synopsis && 
                                    anime[index].synopsis.length > 200 ? anime[index].synopsis.slice(0, 200) + "..." : anime[index].synopsis
                                }
                            </div>
                            <div className="font-bold text-lg">
                                {anime[index].rating} | {anime[index].year}
                            </div>
                            <div className="flex gap-4">
                                <FButton mode="original" onClick={() => { navigate("/anime/" + anime[index].mal_id); }}>
                                    <div><PlayIcon /></div>
                                    <div>Watch</div>
                                </FButton>
                                <FButton mode="invert">
                                    <div><MarkIcon /></div>
                                    <div>Add to list</div>
                                </FButton>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Featured;