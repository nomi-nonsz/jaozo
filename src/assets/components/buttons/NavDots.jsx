import React from "react";

function NavDots ({ data, className, onClick }) {
    const toClick = (target) => {
        onClick(target);
    }

    return (
        data.map((cate, key) => {
            return <div className={"h-2 bg-white rounded-full transition-all cursor-pointer duration-700 " + className} key={key} onClick={toClick}></div>
        })
    )
}

export default NavDots;