import React from "react";
import { Link } from "react-router-dom";

function List ({ name, count, url }) {
    return (
        <Link className="flex flex-row justify-between items-center py-3 px-4 rounded-md bg-border-primary bg-opacity-10 hover:bg-opacity-20 transition" to={url}>
            <div className="text-sm">{name}</div>
            <div className="font-bold text-xs">{count}</div>
        </Link>
    )
}

function BurriedLists () {
    return <></>
}

BurriedLists.List = List;

export default BurriedLists;