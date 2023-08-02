import React from "react";
import { Link } from "react-router-dom";

function TrendList ({ trendAnime }) {
    return (
        <ol className="list-decimal flex flex-col gap-2 text-white text-opacity-60 text-sm">
            {trendAnime && trendAnime.data.map((trend, key) => {
                return (
                    <li key={key} className="ps-1 hover:underline">
                        <Link to={`/anime/${trend.mal_id}`}>
                            {trend.title_english ? trend.title_english : trend.title}
                        </Link>
                    </li>
                )
            })}
        </ol>
    )
}

export default TrendList;