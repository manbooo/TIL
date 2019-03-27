import React from 'react'

import { Row, Col, Card, Empty, Icon, Table } from 'antd'
import basicStyle from './BasicStyle'

const { rowStyle, gutter, colStyle } = basicStyle

const renderActions = (parent, dataSource, actions) => {
  if (!actions) return <div className="no-actions" />

  return (
    <Row gutter={gutter} type="flex">
      {actions.map(action => {
        return <Col>{action.render && action.render(parent, dataSource)}</Col>
      })}
    </Row>
  )
}

const TableComponent = ({
  title,
  columns,
  dataSource,
  pagination,
  onPageHandle,
  actions = []
}) => {
  const paginationConfig = {
    current: pagination?.current?.page || 1,
    pageSize: pagination?.perPage || 5,
    total: pagination?.total || 1,
    onChange: onPageHandle
  }
  
  return (
    <React.Fragment>
      <Row
        style={rowStyle}
        gutter={gutter}
        type="flex"
        align="middle"
        justify="space-between"
      >
        {title && (
          <Col style={colStyle}>
            <h3>{title}</h3>
          </Col>
        )}
        <Col style={colStyle}>{renderActions(parent, dataSource, actions)}</Col>
      </Row>

      <Table columns={columns} dataSource={dataSource} pagination={paginationConfig} />
    </React.Fragment>
  )
}

export default TableComponent
