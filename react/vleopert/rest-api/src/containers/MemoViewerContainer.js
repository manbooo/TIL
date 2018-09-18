import React, { Component } from 'react'
import MemoViewer from 'components/MemoViewer'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as uiAction from 'modules/ui'
import * as memoAction from 'modules/memo'


class MemoViewerContainer extends Component {
    handleUpdate = (value) => {
        const { MemoAction, UIAction, memo } = this.props
        const { id } = memo

        MemoAction.updateMemo({
            id,
            memo: value
        })

        UIAction.closeViewer()
    }

    handleDelete = () => {
        const { MemoAction, UIAction, memo } = this.props
        const { id } = memo

        MemoAction.deleteMemo(id)

        UIAction.closeViewer()
    }

    render() {
        const { visible, memo, UIAction } = this.props
        const { title, body } = memo

        return (
            <MemoViewer
                visible={visible}
                title={title}
                body={body}
                onClose={UIAction.closeViewer}
                onUpdate={this.handleUpdate}
                onDelete={this.handleDelete}
            />
        )
    }
}

export default connect(
    (state) => ({
        visible: state.ui.memo.open,
        memo: state.ui.memo.info
    }),
    (dispatch) => ({
        UIAction: bindActionCreators(uiAction, dispatch),
        MemoAction: bindActionCreators(memoAction, dispatch)
    })
)(MemoViewerContainer)
