import React, { useState } from "react";
import ColList from "./ColList";
import LeftArrow from "../../buttons/arrow/LeftArrow";
import RightArrow from "../../buttons/arrow/RightArrow";

function RowList ({ title, data }) {
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
                            return <ColList anime={anime} key={key} />
                        })}
                    </div>
                </div>
            </div>
            <LeftArrow onClick={prev} />
            <RightArrow onClick={next} />
        </div>
    )
}

export default RowList;