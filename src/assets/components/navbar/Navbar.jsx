import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import DesktopList from "./DesktopList";
import MobileList from "./MobileList";
import Logo from "../icons/Logo";
import SearchBar from "../SearchBar";
import Hamburger from "./Hamburger";

function Navbar ({ pages }) {
    const navigate = useNavigate();
    
    const [showNav, setNav] = useState(false);
    
    const onSearch = (e, query) => {
        const q = query;

        e.preventDefault();

        if (query.length > 0) {
          navigate(`/search?query=${encodeURIComponent(q)}`);
        }
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
                            return <DesktopList page={p} key={k} />
                        })}
                        <SearchBar placeholder="One Piece, Naruto..." theme='darked' handleSearch={onSearch} />
                    </div>
                    <div className="h-full items-center block lg:hidden">
                        <Hamburger state={[showNav, setNav]} />
                    </div>
                </div>
            </nav>
            <nav className={"z-50 lg:hidden fixed top-0 block w-screen h-screen bg-black text-white transition-[left,background-color] duration-500 " + (showNav ? "left-0 bg-opacity-50" : "left-[100vw] bg-opacity-0")}>
                <nav className={"absolute overflow-y-scroll w-[80vw] border-s border-pit-primary border-opacity-20 h-screen bg-dark-primary top-0 p-7 xs:p-10 transition-[right] duration-500 " + (showNav ? "right-0" : "-right-[20vw]")}>
                    <button className="relative w-[50px] h-[50px] border rounded-md mb-4 border-pit-primary border-opacity-20" onClick={() => { setNav(false) }}>
                        <div className="bg-white absolute w-[30px] h-[4px] left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 rotate-45"></div>
                        <div className="bg-white absolute w-[30px] h-[4px] left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 -rotate-45"></div>
                    </button>
                    <div className="mb-5 sm:flex sm:justify-start">
                        <SearchBar placeholder="One Piece, Naruto..." theme='darked' handleSearch={onSearch} />
                    </div>
                    <ul className="flex flex-col">
                        {pages.map((page, key) => {
                            if (!page) {
                                return <MobileList navState={[showNav, setNav]} key={key} />
                            }
                            return (
                                <MobileList navState={[showNav, setNav]} name={page.name} childs={page.child} url={page.url} key={key} />
                            );
                        })}
                    </ul>
                </nav>
            </nav>
        </>
    )
}

export default Navbar