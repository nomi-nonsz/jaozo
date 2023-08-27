import React from "react";

export default function FefoGrid ({ className, gap, children }) {
    return (
        <div className={"grid grid-cols-10 " + (gap ? "gap-" + gap : "") + (className ? " " + className : "")}>{children}</div>
    )
}