import React from 'react'
import { storiesOf } from '@storybook/react'
import { Row, Col, Button, Tag, Divider } from 'antd'
import basicStyle from '../components/BasicStyle'
import Layout from '../layout/Layout'
import TableComponent from '../components/TableComponent'

const { rowStyle, gutter, colStyle } = basicStyle

storiesOf('Component', module).add('TableComponent', () => {
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: text => <a href="javascript:;">{text}</a>
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age'
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address'
    },
    {
      title: 'Tags',
      key: 'tags',
      dataIndex: 'tags',
      render: tags => (
        <span>
          {tags.map(tag => {
            let color = tag.length > 5 ? 'geekblue' : 'green'
            if (tag === 'loser') {
              color = 'volcano'
            }
            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            )
          })}
        </span>
      )
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <Row gutter={gutter} type="flex">
          <Col>
            <Button
              type="ghost"
              shape="circle"
              size="small"
              icon="edit"
              onClick={e => onClickHandle('edit')}
            />
          </Col>
          <Col>
            <Button
              type="ghost"
              shape="circle"
              size="small"
              icon="delete"
              onClick={e => onClickHandle('delete')}
            />
          </Col>
        </Row>
      )
    }
  ]

  const dataSource = [
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
      tags: ['nice', 'developer']
    },
    {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
      tags: ['loser']
    },
    {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park',
      tags: ['cool', 'teacher']
    },
    {
      key: '4',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
      tags: ['nice', 'developer']
    },
    {
      key: '5',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
      tags: ['loser']
    },
    {
      key: '6',
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park',
      tags: ['cool', 'teacher']
    },
    {
      key: '7',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
      tags: ['nice', 'developer']
    },
    {
      key: '8',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
      tags: ['loser']
    },
    {
      key: '9',
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park',
      tags: ['cool', 'teacher']
    }
  ]

  const actions = [
    {
      id: 'refresh',
      render: (parent, dataSource) => {
        return (
          <Button
            type="ghost"
            shape="circle"
            size="small"
            icon="reload"
            onClick={e => onClickHandle('reload')}
          />
        )
      }
    },
    {
      id: 'new',
      render: (parent, dataSource) => {
        return (
          <Button
            type="ghost"
            shape="circle"
            size="small"
            icon="plus"
            onClick={e => onClickHandle('add')}
          />
        )
      }
    }
  ]

  const onClickHandle = msg => {
    console.log(`${msg} Button Clicked`)
  }

  const pagination = {
    current: 1,
    offset: 0,
    limit: 5,
    total: dataSource.length
  }

  const onPageHandle = page => {
    console.log(page)
  }

  const onRowClick = (record, rowIndex) => {
    console.log(record)
  }

  return (
    <Layout>
      <TableComponent
        title="Sample Title"
        columns={columns}
        dataSource={dataSource}
        actions={actions}
        pagination={pagination}
        onPageHandle={onPageHandle}
        onRowClick={onRowClick}
      />
    </Layout>
  )
})
