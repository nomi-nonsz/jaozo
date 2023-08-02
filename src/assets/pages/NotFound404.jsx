import React from "react";
import img from "../images/not-found.png";

function NotFound404 () {
    return (
        <main className="h-[90vh] flex flex-col gap-5 items-center justify-center text-center text-white font-noto-sans">
            <header className="font-montserrat">
                <h1 className="text-6xl">404</h1>
                <p className="text-2xl">Not Found</p>
            </header>
            <figure>
                <img className="w-72" src={img} alt="404" />
            </figure>
            <article className="w-96">
                <p>Why does this page appear? it may be because the content has been moved or deleted or even unavailable. or maybe you typed the wrong url?</p>
            </article>
        </main>
    )
}

export default NotFound404;