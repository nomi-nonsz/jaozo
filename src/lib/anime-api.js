import axios from "axios";

async function fetchAnime (url) {
    try {
        console.log(`Make request for ${url}`)
        const response = await axios.get(url);
        console.log(`Get data from response`);
        const data = await response.data;
        
        if (response.status != 200 && data) {
            const status = data.status;
            const type = data.type;
            const message = data.message;
    
            throw new Error(`${type}: (${status}) ${message}`);
        }

        console.log(`Successful fetching data`);
        
        return data;
    }
    catch (error) {
        if (error.response) {
            const status = error.response.status;
            const message = error.message;

            if (status == 429) {
                console.error(`GET::${url}. Error Status: ${status}`);
                console.error(`<${status}> Too Many Request! You can't make another request in such a short time. \n\n${message}`);
            }
        }
        else {
            console.error("Something is wrong when trying get anime data");
        }
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

export function getTrendingAnime () {
    return fetchAnime(`https://api.jikan.moe/v4/seasons/now?limit=10`);
}

export function findAnime (query) {
    return fetchAnime(`https://api.jikan.moe/v4/anime?q="${query}"`);
}