import React, { Component } from 'react'
import PropTypes from 'prop-types'

import MemoItem from "./MemoItem";

class MemoList extends Component {

    static defaultProps = {
        memos: [],
        onRemove: console.warn('onRemove is not define')
    }

    render() {
        const {memos, onRemove} = this.props

        return (
            <div>
                {memos.map(memo =>
                    <MemoItem key={memo.id} item={memo} onRemove={onRemove}/>
                )}
            </div>
        )
    }
}

MemoList.propTypes = {
    memos: PropTypes.array.isRequired,
    onRemove: PropTypes.func.isRequired
}


export default MemoList
