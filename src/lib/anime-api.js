import axios from "axios";

async function fetchAnime (url) {
    try {
        const response = await axios.get(url);
        const data = await response.data;
        
        if (response.status && response.status != 200) {
            const status = response.status;
            const type = response.type;
            const message = response.message;
    
            throw new Error(`${type}: (${status}) ${message}`);
        }
        
        return data;
    }
    catch (error) {
        console.error("Something is wrong when trying get anime data");
        console.error(error);
    }
}

// tryna get genres
// nyoba ngambil genre
export function getGenres () {
    return fetchAnime(`https://api.jikan.moe/v4/genres/anime`)
        .then((res) => {
            const populary = res.data.filter(val => val.count > 1500);
            const genres = [];

            populary.forEach(v => {
                const genre_name = v.name;
                const genre_url = `/genre/${genre_name.toLowerCase()}`.replace(/\s+/g, "-");

                genres.push({ name: genre_name, url: genre_url });
            });

            return genres;
        })
        .catch((error) => {
            console.error("Can't get genre data");
            return false;
        })
}

export function getEpisodeById (id) {
    return fetchAnime(`https://api.jikan.moe/v4/anime/${id}/episodes`);
}

export function getAnime (id) {
    return fetchAnime(`https://api.jikan.moe/v4/anime/${id}/full`);
}