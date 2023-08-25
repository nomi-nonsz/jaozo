import React from "react";
import { useNavigate } from "react-router-dom";
import { ReactComponent as LeftArrow } from "../../icons/arrow-left.svg";

function PageButtons ({ pagination }) {
    const navigate = useNavigate();

    const prev = () => {
        navigate("?page=" + (pagination.current_page - 1));
    }

    const next = () => {
        navigate("?page=" + (pagination.current_page + 1));
    }

    return (
        <div className="flex flex-row justify-center gap-4">
            {pagination.current_page > 1 && 
                <button className="rounded-lg w-14 h-14 grid items-center justify-center bg-pit-primary bg-opacity-10" onClick={prev}>
                    <LeftArrow className="w-2" />
                </button>
            }
            <div className="rounded-lg w-14 h-14 grid items-center justify-center bg-pit-primary bg-opacity-10">{pagination.current_page}</div>
            {pagination.current_page < pagination.last_visible_page && 
                <button className="rounded-lg w-14 h-14 grid items-center justify-center bg-pit-primary bg-opacity-10" onClick={next}>
                    <LeftArrow className="w-2 rotate-180" />
                </button>
            }
        </div>
    )
}

export default PageButtons;