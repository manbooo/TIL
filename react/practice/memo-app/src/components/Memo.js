import React, { Component } from 'react'
import MemoForm from './MemoForm'
import MemoCard from './MemoCard'

import {connect} from 'react-redux'

import './Memo.css'
import {addMemo, removeMemo} from "../reducers/memo";

class Memo extends Component {
    id = 0
    state = {
        memo : [
            {
                id: 0,
                title: 'test',
                content: 'test'
            }
        ]
    }

    _handleCreate = (data) => {
        // console.log(data)

        const added = {id: ++this.id, ...data}

        this.setState({
            memo: [...this.state.memo, added]
        })

        // console.log(this.state.memo)
    }

    _handleUpdate = (data) => {
        console.log(data)
    }

    _handleRemove = (id) => {
        this.setState({
            memo: this.state.memo.filter(m => m.id !== id)
        })
    }

    render() {
        console.log(this.state.memo)

        return (
            <div className="Memo">
                <MemoForm onCreate={this._handleCreate} />

                <MemoList
                    memos={this.state.memo}
                    onUPdate={this._handleUpdate}
                    onRemove={this._handleRemove}
                />
            </div>
        )
    }
}

function MemoList({memos, onUpdate, onRemove}) {
    return (
        <div className="Memo-List">
            {memos ?
                memos.map(memo =>
                    <MemoCard
                        key={memo.id} memo={memo}
                        onUpdate={onUpdate}
                        onRemove={onRemove}
                    />)
                : <p>Nothing!!</p>
            }
        </div>
    )
}

export default Memo