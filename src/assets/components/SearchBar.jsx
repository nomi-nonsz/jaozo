import React, { useEffect, useState } from "react"
import SearchIcon from "./icons/SearchIcon"
import { useNavigate } from "react-router-dom";

export default function SearchBar ({ placeholder, theme }) {
    const navigate = useNavigate();
    const [query, setQuery] = useState("");
    const [btnTheme, setBtnTheme] = useState("");
    const [inpTheme, setInpTheme] = useState("");

    useEffect(() => {
        switch (theme) {
            case 'original':
                setBtnTheme("bg-primary hover:bg-border-primary text-white");
                setInpTheme("ps-[72px]");
                break;
            case 'darked':
                setBtnTheme('bg-transparent hover:bg-transparent text-pit-primary');
                setInpTheme("ps-14");
                break;
            default:
                setBtnTheme("bg-primary hover:bg-border-primary text-white");
                setInpTheme("ps-[72px]");
        }
    }, [theme]);

    const handleSearch = (e) => {
        const q = query;

        e.preventDefault();

        if (query.length > 0) {
            setQuery("");
            navigate(`/search?query=${encodeURIComponent(q)}`);
        }

    }

    const handleChange = (e) => {
        setQuery(e.target.value);
    }

    return (
        <form onSubmit={handleSearch} className="searchbar">
            <div className='relative sm:w-96 h-14 mx-auto'>
                <button
                    type="submit"
                    className={btnTheme + " transition absolute left-0 duration-200 w-14 h-full grid items-center rounded-s-md"}
                    >
                        <SearchIcon width={17} center={true} />
                    </button>
                <input
                    type="text"
                    name="query"
                    onChange={handleChange}
                    value={query}
                    placeholder={placeholder}
                    className={inpTheme + " w-full h-full rounded-md bg-dark-primary focus:bg-black focus:bg-opacity-60 border border-pit-primary border-opacity-20 focus:border-border-primary focus:border-opacity-60 text-pit-primary outline-none font-noto-sans placeholder:text-sm placeholder:text-pit-primary placeholder:text-opacity-50 transition"}
                />
            </div>
        </form>
    )
}