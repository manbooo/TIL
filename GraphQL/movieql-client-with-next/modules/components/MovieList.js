import React from 'react'
import { Helmet } from 'react-helmet'
import styled from 'styled-components'

import getGraphqlData from 'lib/getGraphqlData'
import {MOVIE_LIST} from 'lib/queries'
import Movie from "./Movie"

const Container = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 0.7fr);
    flex-wrap: wrap;
    justify-items: center;
`

class MovieList extends React.Component {


    render() {
        const { movieList } = this.props

        return (
            <Container>
                <Helmet>
                    <title>Home | MovieQL</title>
                </Helmet>
                {
                    movieList.map(movie => (
                        <Movie key={movie.id} id={movie.id} title={movie.title} rating={movie.rating} poster={movie.medium_cover_image} />
                    ))
                }
            </Container>
        )
    }
}

export default MovieList
