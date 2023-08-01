import React from "react";

function FButton ({ mode, onClick, type, children }) {
    const themes = () => {
        switch (mode) {
            case 'normal': return "btn-primary"; break;
            case 'invert': return "btn-invert-primary"; break;
            default: return "btn-primary";
        }
    }

    if (type === "single") {
        return (
            <button className={`${themes()} w-12 h-12 grid items-center justify-center rounded-md`} onClick={onClick}>
                {children}
            </button>
        )
    }
    else {
        return (
            <button className={`${themes()} px-5 py-4 w-40 flex flex-row gap-4 items-center rounded-md`} onClick={onClick}>
                {children}
            </button>
        )
    }
}

export default FButton;