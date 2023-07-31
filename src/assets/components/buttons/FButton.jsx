import React from "react";

function FButton ({ mode, onClick, children }) {
    const switches = () => {
        switch (mode) {
            case 'normal': return "btn-primary"; break;
            case 'invert': return "btn-invert-primary"; break;
            default: return "btn-primary";
        }
    }

    return (
        <button className={`${switches()} px-5 py-4 w-40 flex flex-row gap-4 items-center rounded-md`} onClick={onClick}>
            {children}
        </button>
    )
}

export default FButton;