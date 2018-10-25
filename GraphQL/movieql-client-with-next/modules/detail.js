import React from 'react'
import styled from 'styled-components'

import { Query } from 'react-apollo'
import { MOVIE_DETAILS } from 'lib/queries'

import Movie from './components/Movie'
import getGraphqlData from "../lib/getGraphqlData"

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 4fr;
  margin-bottom: 50px;
`

const Card = styled.div`
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
  background-color: white;
  border-radius: 7px;
`

const Image = Card.withComponent("img")

const Title = styled.h1`
  font-size: 24px;
  margin-bottom: 10px;
`

const Paragraph = styled.span`
  margin-bottom: 10px;
  display: block;
  font-weight: ${props => (props.bold ? "500" : "400")};
`

const MovieContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 0.7fr);
  flex-wrap: wrap;
  justify-items: center;
  margin-top: 50px;
`

class Detail extends React.Component {
    static getInitialProps = async ({apolloClient, query}) => {
        const data = await getGraphqlData(apolloClient, MOVIE_DETAILS, { movieId: query.id })
        console.log(data.movie)
        return {movie: data.movie, suggestions: data.suggestions}
    }

    render() {
         const { movie, suggestions } = this.props

        return (
            <React.Fragment>
                <Container>
                    <Image src={movie.medium_cover_image} />
                    <span>
                          <Title>{movie.title}</Title>
                          <Paragraph bold>Rating: {movie.rating}</Paragraph>
                          <Paragraph>{movie.description_intro}</Paragraph>
                        </span>
                </Container>
                <Title>Suggested</Title>
                <MovieContainer>
                    {suggestions.map(movie => (
                        <Movie
                            key={movie.id}
                            id={movie.id}
                            title={movie.title}
                            rating={movie.rating}
                            poster={movie.medium_cover_image}
                        />
                    ))}
                </MovieContainer>
            </React.Fragment>
        )
    }
}

export default Detail
