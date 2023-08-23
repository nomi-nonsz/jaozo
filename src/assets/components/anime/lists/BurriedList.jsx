import React from "react";
import { Link } from "react-router-dom";

function Loading () {
    const randomWidth = (Math.random() * 40) + 60;

    return (
        <div className="h-10 rounded-md fronta-loading" style={{ width: randomWidth + "%" }}></div>
    )
}

function List ({ name, count, url, className }) {
    return (
        <Link className={"flex flex-row justify-between items-center py-3 px-4 rounded-md bg-border-primary bg-opacity-10 hover:bg-opacity-20 transition " + className} to={url}>
            <div className="text-sm">{name}</div>
            <div className="font-bold text-xs">{count}</div>
        </Link>
    )
}

function BurriedLists () {
    return <></>
}

BurriedLists.Loading = Loading;
BurriedLists.List = List;

export default BurriedLists;