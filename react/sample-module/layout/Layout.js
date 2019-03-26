import React from 'react'
import { Row, Col} from 'antd'

const Layout = ({ children }) => {
  return (
    <Row style={{marginTop: 30}}>
      <Col span={20} offset={2}>
      {children}
        
      </Col>
    </Row>
  )
}

export default Layout
