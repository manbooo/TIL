import React, { Component } from 'react'
import MemoForm from './MemoForm'
import MemoCard from './MemoCard'

import './Memo.css'

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

        const { memo } = this.state

        this.setState({
            memo: memo.concat({id: ++this.id, ...data})
        })

        // console.log(this.state.memo)
    }

    _handleUpdate = (data) => {
        console.log(data)
    }

    _handleRemove = (id) => {
        const { memo } = this.state

        this.setState({
            memo: memo.filter(m => m.id !== id)
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
                        onRemove={onRemove}ß
                    />)
                : <p>Nothing!!</p>
            }
        </div>
    )
}

export default Memo