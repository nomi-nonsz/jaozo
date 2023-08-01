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

    return (
        <nav className="py-7 px-8 md:px-80 lg:px-20 flex justify-between items-center">
            <Link to="/">
                <Logo width={74.7} />
            </Link>
            <div className="flex gap-20 h-full font-montserrat items-center">
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
                                <div className="absolute h-0 opacity-0 group-hover:h-fit p-0 group-hover:opacity-100 overflow-y-hidden transition-all duration-100 top-14 left-0 w-fit group-hover:p-5 group-hover:pe-14 rounded-lg bg-dark-primary">
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
        </nav>
    )
}

export default Navbar