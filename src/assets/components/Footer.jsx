import React from "react";
import { Link } from "react-router-dom";
import isURL from "validator/lib/isURL";
import OLink from "./links/OLink";
import Logo from "./icons/Logo";
import navigation from "../data/footer-nav.json";

function Footer () {
    const linkClass = "text-white text-opacity-50 hover:text-opacity-100 transition duration-200";

    return (
        <footer className="bg-[#010010] py-20 md:py-0 md:h-[288px] text-white">
            <div className="base-container flex flex-col gap-6 md:gap-0 justify-start md:flex-row md:justify-between md:items-center h-full">
                <section className="flex flex-col md:flex-row gap-8 md:items-center">
                    <div className="">
                        <Logo width={192} />
                    </div>
                    <header className="xs:w-[400px]">
                        <h1 className="text-2xl">Jaozo</h1>
                        <p className="text-sm">The anime streaming-like for fun i guess... Anime database from <OLink blank={true} href="https://myanimelist.net/">MyAnimeList</OLink> powered with <OLink blank={true} href="https://jikan.moe/">Jikan API</OLink>.<br /><br /> Want to contribute? see <OLink blank={true} href="https://github.com/norman-andrians/jaozo">See source code</OLink></p>
                    </header>
                </section>
                <section className="flex flex-row gap-8">
                    {navigation.map((nav, k) => {
                        return (
                            <div className="flex flex-col gap-1" key={k}>
                                <h2 className="text-xl">{nav.name}</h2>
                                <ul className="text-sm flex flex-col gap-1">
                                    {nav.navs.map((chd, kc) => {
                                        return (
                                            <li key={kc}>
                                                {isURL(chd.url) ?
                                                    <a href={chd.url} target="_blank" className={linkClass}>{chd.name}</a> :
                                                    <Link to={chd.url} className={linkClass}>{chd.name}</Link>
                                                }
                                            </li>
                                        )
                                    })}
                                </ul>
                            </div>
                        )
                    })}
                </section>
            </div>
        </footer>
    );
}

export default Footer;