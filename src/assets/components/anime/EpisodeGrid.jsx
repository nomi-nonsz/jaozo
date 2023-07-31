import React from 'react';

function EpisodeGrid ({ id, title, img, autoWidth }) {
    return (
        <button className={"w-[250px] text-left flex flex-col gap-3 pb-4 group relative " + (autoWidth ? "flex-auto" : "flex-none")}>
            <div className="text-sm text-white rounded-e-md absolute top-2 left-0 bg-dark-primary p-2 overflow-x-hidden w-0 text-opacity-0 group-hover:w-28 group-hover:text-opacity-100 whitespace-nowrap transition-all duration-300">Episode {id}</div>
            <figure className='w-full -z-10'>
                <img src={img} alt={title} className="rounded-md w-full brightness-90 group-hover:brightness-50 transition duration-200" />
            </figure>
            <div className="text-white group-hover:opacity-50 transition duration-200">{title}</div>
        </button>
    );
}

export default EpisodeGrid;