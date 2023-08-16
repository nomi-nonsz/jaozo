import axios from "axios";

const momoko_domain = "";
const local_domain = "http://localhost:6969";

async function fetchAnime (url, config) {
    try {
        console.log(`Make request for ${url}`)
        const response = await axios.get(url, config);
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
                console.error(`<${status}> Too Many Request! You can't make another request in such a short time. \n\n${message}`);
            }
        }
        else {
            console.error("Something is wrong when trying get anime data");
        }

        throw error;
    }
}

// tryna get genres
// nyoba ngambil genre
export async function getGenres () {
    try {
        const res = await fetchAnime(`https://api.jikan.moe/v4/genres/anime`);
        const populary = res.data.filter(val => val.count > 1500);
        const genres = [];

        populary.forEach(v => {
            const genre_name = v.name;
            const genre_url = `/genre/${genre_name.toLowerCase()}`.replace(/\s+/g, "-");

            genres.push({ name: genre_name, url: genre_url });
        });
        return genres;
    } catch (error) {
        console.error("Can't get genre data");
        return false;
    }
}

export function getEpisodeById (id) {
    return fetchAnime(`https://api.jikan.moe/v4/anime/${id}/episodes`);
}

export function getAnime (id) {
    return fetchAnime(`https://api.jikan.moe/v4/anime/${id}/full`);
}

export async function getMultipleAnime (ids) {
    try {
        const animes = await axios.get(`${local_domain}/anime`, {
            params: {
                mal_id: ids
            }
        })
        return animes;
    }
    catch (error) {
        throw error;
    }
}

export async function getTopAnime () {
    try {
        const data = await fetchAnime(`https://api.jikan.moe/v4/top/anime`);
        return data;
    } catch (error) {
        throw error;
    }
}

export async function getTopAiring () {
    try {
        return await fetchAnime("https://api.jikan.moe/v4/top/anime", {
            params: {
                filter: "airing"
            }
        });
    } catch (error) {
        throw error;
    }
}

export async function getTrendingAnime () {
    try {
        const data = await fetchAnime(`https://api.jikan.moe/v4/seasons/now`);
        return data;
    } catch (error) {
        throw error;
    }
}

export async function getLatestEpisode () {
    try {
        const data = await fetchAnime(`https://api.jikan.moe/v4/watch/episodes`);
        return data;
    } catch (error) {
        throw error;
    }
}

export async function findAnime (query) {
    try {
        return await fetchAnime(`https://api.jikan.moe/v4/anime?q="${query}"`);
    } catch (error) {
        throw error;
    }
}