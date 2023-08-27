import React from "react";

export default function Section ({ className, gap, children }) {
    return (
        <div className={"flex flex-col " + (!gap ? "gap-6" : "gap-" + gap) + (className ? " " + className : "")}>{children}</div>
    )
}