import React from 'react'

import MovieList from './components/MovieList'

import getGraphqlData from 'lib/getGraphqlData'
import {MOVIE_LIST} from 'lib/queries'

class Index extends React.Component {
    static getInitialProps = async (context) => {
        const data = await getGraphqlData(context.apolloClient, MOVIE_LIST, { limit: 50, rating: 7.0 })

        return { movieList: data.movies }
    }

    render() {
        return (
            <MovieList movieList={this.props.movieList}/>
        )
    }
}

export default Index
