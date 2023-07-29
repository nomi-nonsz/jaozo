import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import Logo from "./icons/Logo";
import SearchBar from "./SearchBar";

function Navbar () {
    const navigate = useNavigate();
    const styles = {
        navItems: "text-white text-opacity-80 hover:text-opacity-100 transition duration-300"
    }

    // the template
    // templatenya
    const pages = [
        {
            name: 'Home',
            url: '/home',
            child: null
        },
        {
            name: 'Genres',
            url: '/genre',
            child: []
        },
        {
            name: 'Theme',
            url: '/theme',
            child: null
        },
        {
            name: 'Status',
            url: '/status',
            child: null
        },
    ]
    const [rpages, setPages] = useState([]);

    // tryna get genres
    // nyoba ngambil genre
    const getGenres = async () => {
        try {
            const response = await axios.get(`https://api.jikan.moe/v4/genres/anime`);
            const data = await response.data;
            
            if (response.status && response.status != 200) {
                const status = response.status;
                const type = response.type;
                const message = response.message;

                throw new Error(`${type}: (${status}) ${message}`);
            }
            
            return data;
        }
        catch (error) {
            console.error("Something is wrong when trying get anime genres data");
            console.error(error);
        }
    }

    useEffect(() => {
        getGenres().then((data) => {
            const genres = data.data.filter(val => val.count > 1500);

            genres.forEach(v => {
                const genre_name = v.name;
                const genre_url = `/genre/${genre_name.toLowerCase()}`.replace(/\s+/g, "-");

                pages[1].child.push({ name: genre_name, url: genre_url });
            });
            setPages(pages);
        }).catch((error) => {
            setPages(pages);
        });
    }, []);

    return (
        <nav className="py-7 px-8 md:px-60 lg:px-20 flex justify-between items-center">
            <Link to="/">
                <Logo width={74.7} />
            </Link>
            <div className="flex gap-20 h-full font-montserrat items-center">
                {rpages.map((p, k) => {
                    return (
                        <div
                            className="text-lg py-4 relative group"
                            key={k}>
                            <Link to={p.url} className={styles.navItems}>
                                {p.name}
                            </Link>
                            {p.child && (
                                <div className="absolute h-0 opacity-0 group-hover:h-fit p-0 group-hover:opacity-100 overflow-y-hidden transition-all duration-100 top-14 left-0 w-fit group-hover:p-5 group-hover:pe-14 rounded-lg bg-dark-primary">
                                    {p.child.map((chi, f) => {
                                        return <Link key={f} to={chi.url} className={"font-noto-sans text-base my-2 block " + styles.navItems}>{chi.name}</Link>
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