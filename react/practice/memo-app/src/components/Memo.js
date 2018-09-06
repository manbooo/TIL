import React, { Component } from 'react'
import MemoForm from "./MemoForm";

class Memo extends Component {
    state = {
        memo : [
            {
                title: 'test',
                content: 'test'
            }
        ]
    }

    _handleCreate = (data) => {
        // console.log(data)

        const { memo } = this.state

        this.setState({
            memo: memo.concat(data)
        })

        // console.log(this.state.memo)
    }

    render() {
        return (
            <div className="Memo-App">
                Memo component

                <MemoForm onCreate={this._handleCreate} />
            </div>
        )
    }
}
export default Memo