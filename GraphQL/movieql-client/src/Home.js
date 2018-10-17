import React from 'react'
import { Query } from 'react-apollo'

import { HOME_PAGE } from './queries'

import styled from 'styled-components'
import { SpinComponent } from './uicomponents/SpinComponent'
import { ErrorComponent } from './uicomponents/ErrorComponent'

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 0.7fr);
  flex-wrap: wrap;
  justify-items: center;
`

class Home extends React.Component {
    _renderComponent = ({ loading, data, error }) => {
        if(loading) return <SpinComponent />
        if(error) return <ErrorComponent description="Something happened!!"/>
        return data.movies.map(movie => (
            <h2 key={movie.id}>
                {movie.title} / {movie.rating}
            </h2>
        ))
    }
    render() {
        return(
            <Container>
                <Query query={HOME_PAGE}>
                    {({ loading, data, error }) => this._renderComponent({ loading, data, error })}
                </Query>
            </Container>
        )
    }
}



export default Home
