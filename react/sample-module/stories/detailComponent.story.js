import React from 'react'
import { storiesOf } from '@storybook/react'
import { Button } from 'antd'
import moment from 'moment'

import Layout from '../layout/Layout'
import DetailComponent from '../components/DetailComponent'

storiesOf('Component', module).add('DetailComponent', () => {
  const configs = {
    name: {
      label: '이름'
    },
    age: {
      label: '나이'
    },
    gender: {
      label: '성별'
    },
    created_at: {
      label: '등록일',
      render: (text, record, index) => moment(text).format('YYYY-MM-DD')
    }
  }

  const dataSource = {
    name: 'test',
    age: 25,
    gender: 'female',
    locale: 'Korea',
    created_at: new Date()
  }

  const actions = [
    {
      id: 'new',
      render: (parent, dataSource) => {
        return <Button type="ghost" shape="circle" size="small" icon="plus" />
      }
    },
    {
      id: 'edit',
      render: (parent, dataSource) => {
        return <Button type="ghost" shape="circle" size="small" icon="edit" />
      }
    },
    {
      id: 'delete',
      render: (parent, dataSource) => {
        return <Button type="ghost" shape="circle" size="small" icon="delete" />
      }
    }
  ]

  return (
    <Layout>
      <DetailComponent
        title="Sample Title"
        configs={configs}
        dataSource={dataSource}
        actions={actions}
      />
    </Layout>
  )
})
