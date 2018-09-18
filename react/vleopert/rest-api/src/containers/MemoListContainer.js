import React, { Component } from 'react'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as uiAction from 'modules/ui'

import MemoList from 'components/MemoList'

class MemoListContainer extends Component {
    render() {
        const { UIAction, memos } = this.props

        return (
            <MemoList
                memos={memos}
                onOpen={UIAction.openViewer}
            />
        )
    }
}

export default connect(
    (state) => ({
        memos: state.memo.data
    }),
    (dispatch) => ({
        UIAction: bindActionCreators(uiAction, dispatch)
    })
)(MemoListContainer)
