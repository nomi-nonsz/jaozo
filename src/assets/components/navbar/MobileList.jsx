import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ReactComponent as DownArrow } from "../../icons/arrow-down.svg";

function MobileList ({ navState, name, url, childs }) {
    const navigate = useNavigate();

    const [dropped, setDrop] = useState(false);
    const [showNav, setNav] = navState;

    const toggleDrop = () => {
        if (childs) setDrop(!dropped)
        else {
            setNav(!showNav);
            navigate(url);
        }
    }

    if (!name && !url && !childs) {
        return (
            <li className="py-3">
                <div className="h-8 w-[80%] bg-white bg-opacity-30 relative rounded"></div>
            </li>
        );
    }

    return (
        <li className="">
            <div className={"py-3 flex flex-row items-center " + (childs && "justify-between")} onClick={toggleDrop}>
                <div className="text-base sm:text-xl font-noto-sans">{name}</div>
                {childs && <div className={"transition duration-200 " + (!dropped ? "rotate-0" : "rotate-180")}><DownArrow /></div>}
            </div>
            {childs && <div className={"grid overflow-hidden transition-all duration-200 " + (dropped ? "grid-rows-[1fr]" : "grid-rows-[0fr]")}>
                <ul className="min-h-[0] font-noto-sans ps-3">
                    {childs.map((child, key) => {
                        return <li key={key}><Link onClick={() => { setNav(!showNav) }} className="py-2 block w-full text-white text-opacity-60 hover:text-opacity-100" to={child.url}>{child.name}</Link></li>
                    })}
                </ul>
            </div>}
        </li>
    )
}

export default MobileList;