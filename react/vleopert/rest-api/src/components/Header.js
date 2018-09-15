import React from 'react'
import styled from 'styled-components'
import oc from 'open-color'

const Wrapper = styled.div `
    /* 레이아웃 */
    display: flex;
    position: fixed;
    align-items: center;
    justify-content: center;
    height: 60px;
    width: 100%;
    top: 0px;
    z-index: 5;

    /* 색상 */
    background: ${oc.indigo[6]};
    color: white;
    border-bottom: 1px solid ${oc.indigo[7]};
    box-shadow: 0 3px 6px rgba(0,0,0,0.10), 0 3px 6px rgba(0,0,0,0.20);

    /* 폰트 */
    font-family: 'Anton', sans-serif;
    font-size: 2.5rem;
`

const Header = () => (
    <Wrapper>
        MEMO
    </Wrapper>
)

export default Header
