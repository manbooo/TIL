import React from 'react'

import { Row, Col, Card, Empty, Icon, Divider } from 'antd'
import basicStyle from './BasicStyle'

const { rowStyle, gutter, colStyle } = basicStyle

const renderActions = (parent, dataSource, actions) => {
  if (!actions) return <div className="no-actions" />

  return (
    <Row gutter={gutter} type="flex" justify="space-between">
      {actions.map(action => {
        return <Col>{action.render && action.render(parent, dataSource)}</Col>
      })}
    </Row>
  )
}

const renderDetailItem = (dataSource, configs) => {
  if (!dataSource) return <Empty />

  const fields = Object.keys(dataSource)
  const configKeys = Object.keys(configs)
  const configuredFields = fields.filter(field => configKeys.includes(field))

  return configuredFields.map((fieldName, index) => {
    return (
      <DetailItem
        dataSource={dataSource}
        config={configs[fieldName]}
        fieldName={fieldName}
        index={index}
      />
    )
  })
}

const DetailItem = ({ dataSource, config, fieldName, index }) => {
  const title = config.label ? config.label : fieldName

  const renderItem = () => {
    if (config.render) {
      return config.render(dataSource[fieldName], dataSource, index)
    } else {
      return dataSource[fieldName]
    }
  }

  return (
    <Row gutter={gutter} type="flex">
      <Col span={4}>
        <p>{title}</p>
      </Col>
      <Col span={20}>{renderItem()}</Col>
    </Row>
  )
}

const DetailComponent = ({
  parent,
  title,
  actions = [],
  configs,
  dataSource
}) => {
  return (
    <React.Fragment>
      <Card
        title={title}
        extra={renderActions(parent, dataSource, actions)}
        bordered={false}
      >
        {renderDetailItem(dataSource, configs)}
      </Card>
    </React.Fragment>
  )
}

export default DetailComponent
