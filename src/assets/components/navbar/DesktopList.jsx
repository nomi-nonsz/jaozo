import React from "react";
import { Link } from "react-router-dom";
import { ReactComponent as DownArrow } from "../../icons/arrow-down.svg";

function DesktopList ({ page }) {
    const styles = {
        navItems: "text-white text-opacity-80 hover:text-opacity-100 transition duration-300"
    }

    return (
        page == null ?
        <div className="h-8 w-16 bg-white bg-opacity-30 relative rounded"></div> :
        <div
            className="text-lg py-4 relative group">
            <Link to={page.url} className={"flex flex-row items-center gap-3 group " + styles.navItems}>
                <div>{page.name}</div>
                {page.child && <div className="rotate-0 group-hover:rotate-180 transition duration-200"><DownArrow /></div>}
            </Link>
            {page.child && (
                <div className="absolute w-0 h-0 group-hover:w-fit group-hover:h-fit grid grid-rows-6 grid-flow-col z-50 opacity-0 group-hover:opacity-100 overflow-y-hidden transition-opacity duration-200 top-14 left-0 p-0 group-hover:p-3 rounded-lg border border-pit-primary border-opacity-20 bg-dark-primary bg-opacity-90 backdrop-blur-lg">
                    {page.child.map((child, key) => {
                        return (
                            <Link key={key} to={child.url} className={"font-noto-sans text-base block w-full whitespace-nowrap py-2 ps-4 pe-14 hover:bg-pit-primary hover:bg-opacity-10 rounded-md duration-75 " + styles.navItems}>
                                {child.name}
                            </Link>
                        )
                    })}
                </div>
            )}
        </div>
    )
}

export default DesktopList;