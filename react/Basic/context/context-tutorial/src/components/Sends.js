import React from 'react'
import { Form, Input, Button } from 'antd'
import { SampleConsumer, useSample } from '../contexts/sample'

class SendsComponent extends React.Component {
  state = {
    input: ''
  }

  componentDidMount() {
    this.setState({
      input: this.props.value
    })
  }

  handleChange = e => {
    this.setState({ input: e.target.value })
  }

  handleSubmit = e => {
    e.preventDefault()

    this.props.setValue(this.state.input)
  }

  render() {
    const { getFieldDecorator } = this.props.form

    return (
      <Form layout="inline" onSubmit={this.handleSubmit}>
        <Form.Item>
          {getFieldDecorator('input', {
            initialValue: this.state.input,
            rules: []
          })(<Input onChange={this.handleChange} />)}
        </Form.Item>
        <Form.Item>
          <Button htmlType="submit">설정</Button>
        </Form.Item>
      </Form>
    )
  }
}
const Sends = Form.create()(SendsComponent)

// const SendsContainer = () => (
//   <SampleConsumer>
//     {({ state, actions }) => (
//       <Sends value={state.value} setValue={actions.setValue} />
//     )}
//   </SampleConsumer>
// )

export default useSample(Sends)
