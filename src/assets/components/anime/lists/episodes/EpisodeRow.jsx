import React from "react";

function EpisodeRow ({ id, title, img }) {
    return (
        <button className="w-full text-left flex items-center bg-dark-primary hover:bg-primary hover:bg-opacity-20 rounded-lg border border-border-primary border-opacity-20 transition">
            {img &&
                <figure className="">
                    <img src={img} className="h-16 rounded-s-lg" alt={"Episode " + id} />
                </figure>
            }
            <div className="flex justify-between items-center flex-grow py-4 px-8">
                <div className="">{title}</div>
                <div className="">Episodes {id}</div>
            </div>
        </button>
    )
}

export default EpisodeRow;