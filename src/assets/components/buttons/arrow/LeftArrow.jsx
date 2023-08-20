import React from "react";
import { ReactComponent as Icon } from "../../../icons/arrow-left.svg";

function LeftArrow ({ onClick }) {
    return (
        <button className="absolute -left-14 top-1/2 -translate-y-1/2 group" onClick={onClick}>
            <Icon className="fill-white opacity-50 group-hover:opacity-90 group-hover:-translate-x-2 group-active:translate-x-0 transition" />
        </button>
    )
}

export default LeftArrow;