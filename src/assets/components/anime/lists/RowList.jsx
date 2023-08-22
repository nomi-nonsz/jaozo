import React, { useState } from "react";
import ColList from "./ColList";
import LeftArrow from "../../buttons/arrow/LeftArrow";
import RightArrow from "../../buttons/arrow/RightArrow";

function Anime ({ title, data }) {
    const [point, setPoint] = useState(0);

    const next = () => {
        if (point < (data.length / 5) - 1) {
            setPoint(point + 1);
        }
    }
    const prev = () => {
        if (point > 0) {
            setPoint(point - 1);
        }
    }

    return (
        <div className="flex flex-col gap-4 relative">
            <h1 className="text-2xl font-montserrat">{title}</h1>
            <div className="overflow-x-hidden">
                <div className="w-[500%]">
                    <div className="flex gap-4 transition-transform duration-300" style={{ transform: "translateX(-" + ((5 * point) / data.length) * 100 + "%)" }}>
                        {data.map((anime, key) => {
                            return <ColList.Anime anime={anime} key={key} />
                        })}
                    </div>
                </div>
            </div>
            <LeftArrow onClick={prev} />
            <RightArrow onClick={next} />
        </div>
    )
}


function LoadingAnime ({title}) {
    return (
        <div className="flex flex-col gap-4 relative">
            <h1 className="text-2xl font-montserrat">{title}</h1>
            <div className="grid grid-cols-10 gap-4">
                {[...Array(5)].map((i, key) => <ColList.Anime key={key} />)}
            </div>
        </div>
    )
}

Anime.Loading = LoadingAnime;

function Categories ({ title, data }) {
    return (
        <div className="flex flex-col gap-4 relative">
            <h1 className="text-2xl font-montserrat">{title}</h1>
            <div className="grid grid-cols-10 gap-4">
                {data.map((cate, key) => {
                    return <ColList.Categories data={cate} key={key} />
                })}
            </div>
        </div>
    )
}

function RowList ({ title, model, data }) {
    if (model === "categories") {
        return <Categories title={title} data={data} />
    }
    else if (model === "anime") {
        return <Anime title={title} data={data} />
    }
    
    return <>What?</>
}

RowList.Anime = Anime;
RowList.Categories = Categories;

export default RowList;