import React from "react";
import { ReactComponent as Icon } from "../../../icons/arrow-left.svg";

function RightArrow ({ onClick }) {
    return (
        <button className="absolute -right-14 top-1/2 rotate-180 -translate-y-1/2 group" onClick={onClick}>
            <Icon className="fill-white opacity-50 group-hover:opacity-80 transition-opacity" />
        </button>
    )
}

export default RightArrow;