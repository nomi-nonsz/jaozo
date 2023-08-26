import React from "react";

function HeaderButton ({ onClick, children }) {
    return (
        <button className="p-4 bg-primary bg-opacity-10 hover:bg-opacity-20 text-md font-noto-sans rounded-md transition" onClick={onClick}>
            {children}
        </button>
    )
}

export default HeaderButton;