import React, { Component } from 'react';

import axious from 'axios'

export const doIncrement = (prevState) => ({
    counter: prevState + 1
})

export const doDecrement = (prevState) => ({
    counter: prevState - 1
})


class App extends Component {
    constructor() {
        super()

        this.state = {
            counter: 0,
        }

        this.onIncrement = this.onIncrement.bind(this)
        this.onDecrement = this.onDecrement.bind(this)
    }

    componentDidMount() {
        axious.get('http://mypseudodomain/counter')
            .then(counter => this.setState({ asyncCounters : counter }))
            .catch(error => console.log(error))
    }

    onIncrement = () => {
        this.setState(doIncrement)
    }

    onDecrement = () => {
        this.setState(doDecrement)
    }

    render() {
        const { counter } = this.state

        return (
            <div>
                <h1>My Counter</h1>
                <Counter counter={counter} />

                <button
                    type="button"
                    onClick={this.onIncrement}
                >
                    Increment
                </button>

                <button
                    type="button"
                    onClick={this.onDecrement}
                >
                    Decrement
                </button>
            </div>
        )
    }
}

export const Counter = ({ counter }) =>
    <p>{counter}</p>

export default App;
