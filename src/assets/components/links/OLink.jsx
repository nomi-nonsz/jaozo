import React from "react";

export default function OLink ({ href, blank, children }) {
    return (
        <a href={href} target={ blank ? "_blank" : "_self" } className="text-primary hover:text-border-primary transition duration-200">{children}</a>
    )
}