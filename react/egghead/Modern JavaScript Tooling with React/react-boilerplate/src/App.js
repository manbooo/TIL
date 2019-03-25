import React from 'react'

class App extends React.Component {
  state = {
    count: 0
  }

  onIncrease = () => {
    this.setState(state => ({ count: state.count + 1 }))
  }

  onDecrease = () => {
    this.setState(state => ({ count: state.count - 1 }))
  }

  render() {
    // debugger
    return (
      <div>
        <h1>Hello World!!</h1>
        <h2>count: {this.state.count}</h2>
        <button onClick={this.onIncrease}>+</button>
        <button onClick={this.onDecrease}>-</button>
      </div>
    )
  }
}

export default App
