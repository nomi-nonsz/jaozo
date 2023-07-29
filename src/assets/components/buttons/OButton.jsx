import React from "react";

export default function OButton ({ click, className, children }) {
    return (
        <button className={"bg-primary text-white text-sm font-montserrat font-bold py-4 px-14 rounded-sm " + className} onClick={click}>
            {children}
        </button>
    )
}