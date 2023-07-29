import React from "react";

export default function OLink ({ href, children }) {
    return (
        <a href={href} className="text-primary hover:text-border-primary">{children}</a>
    )
}