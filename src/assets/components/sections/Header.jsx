import React from "react";

function Header ({ className, children }) {
    return (
        <h1 className={"font-montserrat text-2xl " + (className ? className : "")}>{children}</h1>
    )
}

export default Header;