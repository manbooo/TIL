import React, { Component } from 'react'
import MemoForm from './MemoForm'

import './Memo.css'

import { Card, Icon } from 'antd'


class MemoCard extends Component {

    state = {
        edit: false
    }

    _handleRemove = () => {
        const { memo, onRemove } = this.props
        onRemove(memo.id)
    }

    _handleChangeForm = () => {
        const edit = this.state.edit

        this.setState({
            edit: !edit
        })
    }

    _renderMemoCard = (memo) => {
        return (
            <Card
                title={memo.title}
                extra={
                    <div className="Icon-List">
                        <a
                            className="event-icon"
                            onClick={this._handleChangeForm}>
                            <Icon type="edit" theme="outlined" />
                        </a>
                        <a
                            className="event-icon"
                            onClick={this._handleRemove}>
                            <Icon type="close" theme="outlined" />
                        </a>
                    </div>
                }
            >
                <p>
                    {memo.content}
                </p>
            </Card>
        )
    }

    _renderMemoForm = (memo) => {
        return (
            <Card
                title={"Edit Memo"}
                extra={
                    <a
                        className="event-icon"
                        onClick={this._handleChangeForm}>
                        <Icon type="close" theme="outlined" />
                    </a>
                }
            >
                <MemoForm memo={memo} onUpdate={this.props.onUpdate}/>
            </Card>
        )
    }

    render() {
        const { memo } = this.props

        return (
            <div className="Memo-card">

                {
                    this.state.edit ?
                        this._renderMemoForm(memo)
                        : this._renderMemoCard(memo)
                }
            </div>
        )
    }
}

export default MemoCard
