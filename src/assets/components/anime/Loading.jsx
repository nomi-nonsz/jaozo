import React, { useEffect, useState } from "react";
import LoadingImg from "../images/oc_purple.png";

function Loading ({ children }) {
    const [dot, setDot] = useState("");

    useEffect(() => {
        const danim = setInterval(() => {
            setDot(dot => dot.length >= 3 ? "" : dot + ".");
        }, 300);

        return () => clearInterval(danim);
    }, []);

    return (
        <div className="text-pit-primary py-40 grid text-center gap-2">
            <figure>
                <img className="w-28 mx-auto animate-img-loading" src={LoadingImg} alt="my oc loading.." />
            </figure>
            <div className="font-montserrat">{children}{dot}</div>
        </div>
    )
}

export default Loading;