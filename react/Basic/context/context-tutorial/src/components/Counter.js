import React from 'react'
import { Button } from 'antd'
import { useAnother } from '../contexts/another'

const Counter = ({ number, increment }) => {
  return (
    <div>
      <h1>{number}</h1>
      <Button onClick={increment}>더하기</Button>
    </div>
  )
}

export default useAnother(Counter)
