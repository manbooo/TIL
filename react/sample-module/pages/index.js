import React from 'react'

import { Button } from 'antd'

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

    const { count } = this.state

    return (
      <div>
        <h1>Hello World!!!</h1>
        <h2 className={count > 10 ? 'warning' : null}>Count: {count}</h2>
        <Button onClick={this.onIncrease}>+</Button>
        <Button onClick={this.onDecrease}>-</Button>
      </div>
    )
  }
}

export default App
