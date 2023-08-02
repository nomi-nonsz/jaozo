import React, { useEffect, useState } from "react";
import OLink from "../links/OLink";
import LoadingImg from "../../images/oc_purple.png";
import DedImg from "../../images/ded.png";

function Loading ({ error, children }) {
    const [dot, setDot] = useState("");

    useEffect(() => {
        if (!error) {
            const danim = setInterval(() => {
                setDot(dot => dot.length >= 3 ? "" : dot + ".");
            }, 300);
    
            return () => clearInterval(danim);
        }
    }, []);

    function HandlingError () {
        if (error == 429) {
            return (<>
                <figure>
                    <img className="w-40 mx-auto" src={DedImg} alt="my oc loading.." />
                </figure>
                <header className="font-montserrat w-[640px] mx-auto">
                    <h1 className="text-2xl">Error 429: Too Many Request!</h1>
                    <p>This message appears when sending requests to the server repeatedly with a short period of time. if this message keeps appearing, <OLink href="https://github.com/norman-andrians/jaozo/issues" blank={true}>report bug</OLink></p>
                </header>
            </>)
        }
        else {
            return (<>
                <figure>
                    <img className="w-40 mx-auto animate-img-loading" src={LoadingImg} alt="my oc loading.." />
                </figure>
                <div className="font-montserrat">{children}{dot}</div>
            </>)
        }
    }

    return (
        <div className="text-pit-primary py-40 grid text-center gap-2">
            <HandlingError />
        </div>
    )
}

export default Loading;