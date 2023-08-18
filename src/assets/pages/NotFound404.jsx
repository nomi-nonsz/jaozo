import React from "react";
import { Link } from "react-router-dom";
import img from "../images/not-found.png";

function NotFound404 () {
    return (
        <main className="py-20 flex flex-col gap-5 items-center justify-center text-center text-white font-noto-sans">
            <header className="font-montserrat">
                <h1 className="text-6xl">404</h1>
                <p className="text-2xl">Not Found</p>
            </header>
            <figure>
                <img className="w-72" src={img} alt="404" />
            </figure>
            <article className="mx-14 xs:mx-auto xs:w-96">
                <p>Why does this page appear? maybe because the content hasn't been added yet. or maybe you typed the wrong url?<br /></p>
            </article>
            <div><Link to={"/"} className="text-primary text-lg hover:text-border-primary transition-colors">Go back to home</Link></div>
        </main>
    )
}

export default NotFound404;