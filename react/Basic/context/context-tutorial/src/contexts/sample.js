import React from 'react'

const Context = React.createContext()

const { Provider, Consumer: SampleConsumer } = Context

class SampleProvider extends React.Component {
  state = {
    value: 'initValue'
  }

  actions = {
    setValue: value => {
      this.setState({ value })
    }
  }

  render() {
    const { state, actions } = this

    const value = { state, actions }

    return <Provider value={value}>{this.props.children}</Provider>
  }
}

// HoC
function useSample(WrappedComponent) {
  return function UseSample(props) {
    return (
      <SampleConsumer>
        {({ state, actions }) => (
          <WrappedComponent value={state.value} setValue={actions.setValue} />
        )}
      </SampleConsumer>
    )
  }
}

export { SampleProvider, SampleConsumer, useSample }
