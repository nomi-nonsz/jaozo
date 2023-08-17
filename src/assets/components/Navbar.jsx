import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { getGenres } from "../../lib/anime-api";
import Logo from "./icons/Logo";
import { ReactComponent as DownArrow } from "../icons/arrow-down.svg";
import SearchBar from "./SearchBar";

function Navbar ({ pages }) {
    const navigate = useNavigate();
    
    const styles = {
        navItems: "text-white text-opacity-80 hover:text-opacity-100 transition duration-300"
    }
    
    const [showNav, setNav] = useState(false);
    
    // The worst component
    function Hamburger () {
        const [dropped, setDrop] = useState(false);
        
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

    function MobileList ({ name, url, childs }) {
        const [dropped, setDrop] = useState(false);

        const toggleDrop = () => {
            if (childs) setDrop(!dropped)
            else {
                setNav(!showNav);
                navigate(url);
            }
        }

        return (
            <li className="">
                <div className={"py-3 flex flex-row items-center " + (childs && "justify-between")} onClick={toggleDrop}>
                    <div className="text-base sm:text-xl font-montserrat">{name}</div>
                    {childs && <div className={"transition duration-200 " + (!dropped ? "rotate-0" : "rotate-180")}><DownArrow /></div>}
                </div>
                {childs && <div className={"grid overflow-hidden transition-all duration-200 " + (dropped ? "grid-rows-[1fr]" : "grid-rows-[0fr]")}>
                    <ul className="min-h-[0] font-noto-sans ps-3">
                        {childs.map((child, key) => {
                            return <li className="py-2 text-white text-opacity-60 hover:text-opacity-100" key={key}><Link to={child.url}>{child.name}</Link></li>
                        })}
                    </ul>
                </div>}
            </li>
        )
    }

    // Goofy ahh classes
    // I don't have a chance for that
    return (
        <>
            <nav className="z-50 py-7 px-7 sm:px-12 lg:px-20 xl:px-40 flex justify-between items-center relative">
                <Link to="/">
                    <Logo width={74.7} />
                </Link>
                <div className="font-montserrat">
                    <div className="gap-14 h-full items-center hidden lg:flex">
                        {pages.map((p, k) => {
                            return (
                                <div
                                    className="text-lg py-4 relative group"
                                    key={k}>
                                    <Link to={p.url} className={"flex flex-row items-center gap-3 group " + styles.navItems}>
                                        <div>{p.name}</div>
                                        {p.child && <div className="rotate-0 group-hover:rotate-180 transition duration-200"><DownArrow /></div>}
                                    </Link>
                                    {p.child && (
                                        <div className="absolute z-50 h-0 opacity-0 group-hover:h-fit p-0 group-hover:opacity-100 overflow-y-hidden transition-all duration-100 top-14 left-0 w-fit group-hover:p-5 group-hover:pe-14 rounded-lg bg-dark-primary">
                                            {p.child.map((chi, f) => {
                                                return (
                                                    <Link key={f} to={chi.url} className={"font-noto-sans text-base my-2 inline-block " + styles.navItems}>
                                                        {chi.name}
                                                    </Link>
                                                )
                                            })}
                                        </div>
                                    )}
                                </div>
                            )
                        })}
                        <SearchBar placeholder="One Piece, Naruto..." theme='darked' />
                    </div>
                    <div className="h-full items-center block lg:hidden">
                        <Hamburger />
                    </div>
                </div>
            </nav>
            <nav className={"z-50 lg:hidden fixed top-0 block w-screen h-screen bg-black text-white transition-[left,background-color] duration-500 " + (showNav ? "left-0 bg-opacity-50" : "left-[100vw] bg-opacity-0")}>
                <nav className={"absolute overflow-y-scroll w-[80vw] border-s border-pit-primary border-opacity-40 h-screen bg-dark-primary top-0 p-7 xs:p-10 transition-[right] duration-500 " + (showNav ? "right-0" : "-right-[20vw]")}>
                    <button className="relative w-[50px] h-[50px] border rounded-md mb-4 border-pit-primary border-opacity-50" onClick={() => { setNav(false) }}>
                        <div className="bg-white absolute w-[30px] h-[4px] left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 rotate-45"></div>
                        <div className="bg-white absolute w-[30px] h-[4px] left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 -rotate-45"></div>
                    </button>
                    <div className="mb-5 sm:flex sm:justify-start">
                        <SearchBar placeholder="One Piece, Naruto..." theme='darked' />
                    </div>
                    <ul className="flex flex-col">
                        {pages.map((page, key) => {
                            return (
                                <MobileList name={page.name} childs={page.child} url={page.url} key={key} />
                            );
                        })}
                    </ul>
                </nav>
            </nav>
        </>
    )
}

export default Navbar