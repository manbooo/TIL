import gql from 'graphql-tag'

export const MOVIE_LIST = gql`
    {
        movies (limit id) {
            id 
            title
            rating
            medium_cover_image
        }
    }
`
