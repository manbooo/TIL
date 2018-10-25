import gql from 'graphql-tag'

export const MOVIE_LIST = gql`
    query movies($limit: Int! $rating: Float!){
        movies(limit: $limit rating: $rating) {
            id
            title
            rating
            medium_cover_image
        }
    }
`

export const MOVIE_DETAILS = gql`
    query getMovieDetails($movieId: Int!) {
        movie(id: $movieId) {
            medium_cover_image
            title
            rating
            description_intro
            language
            genres
        }
        suggestions(id: $movieId) {
            id
            title
            rating
            medium_cover_image
        }
    }
`
