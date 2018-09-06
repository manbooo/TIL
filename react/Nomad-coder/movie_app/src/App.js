import React, { Component } from 'react';
import './App.css';
import Movie from "./components/Movie";

// Render: componentWillMount() -> render() -> componentDidMount()
// Update componentWillReceiveProps() -> shouldComponentUpdate() -> componentWillUpdate() -> render() -> componentDidUpdate()

class App extends Component {
    state = {}

    componentDidMount() {
        this._getMovies()
    }

    _callApi = () => {
        // response : fetch의 결과물
        // const result = fetch("URL")
        //     .then(response => console.log("response"))
        //     .catch(error => console.log("Error!!"))


        return fetch("https://yts.am/api/v2/list_movies.json?sort_by=rating")
            .then(response => response.json())
            .then(json => json.data.movies)
            .catch(error => console.log(error))
    }

    _getMovies = async () => {
        const movies = await this._callApi()

        this.setState({
            movies
        })
    }

    _renderMovies = () => {
        const movies = this.state.movies.map(movie => {
            return (
                <Movie
                    title={movie.title_english}
                    poster={movie.large_cover_image}
                    key={movie.id}
                    genres={movie.genres}
                    synopsis={movie.synopsis}
                />

        )})


        return movies
    }

    render() {
        const { movies } = this.state

        return (
            <div className={movies ? "APP" : "APP--loading"}>
                {movies ? this._renderMovies() : "Loading..."}
            </div>
        );
    }
}

export default App;
