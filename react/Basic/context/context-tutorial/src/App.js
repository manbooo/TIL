import React from 'react'
import { Row, Col } from 'antd'

import LeftPane from './components/LeftPane'
import RightPane from './components/RightPane'
import { SampleProvider } from './contexts/sample'
import { AnotherProvider } from './contexts/another'
import Counter from './components/Counter'

const AppProvider = ({ contexts, children }) =>
  contexts.reduce(
    (prev, context) =>
      React.createElement(context, {
        children: prev
      }),
    children
  )

const App = () => {
  return (
    <AppProvider contexts={[SampleProvider, AnotherProvider]}>
      <Row type="flex" gutter={16} justify="space-around">
        <Col span={12}>
          <LeftPane />
        </Col>
        <Col>
          <RightPane span={12} />
        </Col>
      </Row>
      <Counter />
    </AppProvider>
  )
}

export default App
