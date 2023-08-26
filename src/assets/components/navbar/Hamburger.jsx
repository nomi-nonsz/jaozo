import React, { useState, useEffect } from "react";

// The worst component
function Hamburger ({ state }) {
    const [dropped, setDrop] = useState(false);
    const [showNav, setNav] = state;
    
    useEffect(() => {
        setDrop(showNav);
    }, [setNav]);

    // No no no homie, better you don't look at this or u fix it
    return (
        <button className="relative w-[50px] h-[50px] border rounded-md border-pit-primary border-opacity-50" onClick={() => { setNav(!showNav) }}>
            <div className={"bg-white rounded-full absolute w-[30px] h-[4px] left-1/2 -translate-x-1/2 top-1/2 transition duration-200 " + (dropped ? "rotate-45 -translate-y-1/2" : "-translate-y-3")}></div>
            <div className={"bg-white rounded-full absolute h-[4px] left-1/2 -translate-x-1/2 top-1/2 transition-all duration-200 -translate-y-1/2 " + (dropped ? "w-0 opacity-0" : "w-[30px] opacity-100")}></div>
            <div className={"bg-white rounded-full absolute w-[30px] h-[4px] left-1/2 -translate-x-1/2 top-1/2 transition duration-200 " + (dropped ? "-rotate-45 -translate-y-1/2" : "translate-y-2")}></div>
        </button>
    );
}

export default Hamburger