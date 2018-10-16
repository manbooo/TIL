const axios = require('axios')

const API_URL = "https://yts.am/api/v2/list_movies.json?"

let movies = []

export const getMovies = (limit, minRating) => {
    let REQUEST_URL = API_URL

    if(limit > 0) {
        REQUEST_URL += `limit=${limit}`
    }
    if(minRating > 0) {
        REQUEST_URL += `&minimum_rating=${minRating}`
    }

    return axios.get(REQUEST_URL).then( response => {
        return response.data.data.movies
    })
}
