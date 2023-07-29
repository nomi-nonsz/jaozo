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
    const [rpages, setPages] = useState(pages);

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

            const genres = data.data.filter(val => val.count > 1500);

            genres.forEach(v => {
                const genre_name = v.name;
                const genre_url = `/genre/${genre_name.toLowerCase()}`.replace(/\s+/g, "-");

                pages[1].child.push({ name: genre_name, url: genre_url });
            });
        }
        catch (error) {
            console.error("Something is wrong when trying get anime genres data");
            console.error(error);
        }
    }

    useEffect(() => {
        getGenres().then(() => {
            setPages(pages);
            console.log(rpages);
        });

        return;
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
                            className="text-lg relative"
                            key={k}>
                            <Link to={p.url} className={styles.navItems}>
                                {p.name}
                            </Link>
                            {p.child && (
                                <div className="absolute top-14 left-0 w-fit p-4 rounded-lg bg-dark-primary">
                                    {p.child.map((chi, f) => {
                                        return <div key={f} className={"font-noto-sans text-base my-1 " + styles.navItems}>{chi.name}</div>
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