import React from 'react'

import { Spin } from 'antd'

import styled from 'styled-components'

const SpinContainer = styled.div`
    text-align: center;
    margin: 20px 0;
`

export const SpinComponent = (props) => {
    return (
        <SpinContainer>
            <Spin tip="Loading..."/>
        </SpinContainer>
    )
}
