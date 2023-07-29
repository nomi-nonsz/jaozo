import React from "react"

export default function SearchBar ({ placeholder }) {
    return (
        <div className='flex flex-row h-14 w-96 mx-auto rounded-md bg-dark-primary border border-border-primary border-opacity-30'>
            <button
                className="bg-primary w-16 h-full grid items-center rounded-s-md"
                >S</button>
            <input
                type="text"
                name="q"
                placeholder={placeholder}
                className="h-full w-full bg-transparent ps-5 pb-1 placeholder:text-sm placeholder:text-pit-primary placeholder:text-opacity-50"
            />
        </div>
    )
}