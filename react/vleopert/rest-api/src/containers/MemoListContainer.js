import React, { Component } from 'react'
import { connect } from 'react-redux'
import MemoList from 'components/MemoList'

class MemoListContainer extends Component {
    render() {
        const { memos } = this.props

        return (
            <MemoList
                memos={memos}
            />
        )
    }
}

export default connect(
    (state) => ({
        memos: state.data
    })
)(MemoListContainer)
