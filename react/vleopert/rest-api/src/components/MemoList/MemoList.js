import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { media } from 'lib/style-utils'

import Memo from './Memo'

const Wrapper = styled.div`
    display: block;
    margin-top: 0.5rem;
    font-size: 0px; /* inline-block 위아래 사이에 생기는 여백을 제거 */

    ${media.mobile`
        margin-top: 0.25rem;
    `}
`

const MemoList = ({memos, onOpen}) => {
    const memoList = memos.map(
        memo => (
            <Memo
                key={memo.id}
                memo={memo}
                onOpen={onOpen}
            />
        )
    )

    return (
        <Wrapper>
            {memoList}
        </Wrapper>
    )
}

MemoList.propTypes = {
    memos: PropTypes.array,
    onOpen: PropTypes.func
}

export default MemoList
