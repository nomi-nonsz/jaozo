import { createContext } from "react";

export const FeaturedContext = createContext({
    content: {
        hot: null,
        hotSummary: null,
        top: null,
        eps: null,
        genre: null,
        airing: null
    },
    setContent: function () {}
});