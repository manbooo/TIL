import React, { Component } from 'react'
import PropTypes from 'prop-types'

import MemoForm from './MemoForm'

import { Card, Icon } from 'antd'

class MemoItem extends Component {
    static defaultProps = {
        item: {},
        onRemove: console.warn('onRemove is not define'),
        onUpdate: console.warn('onUpdate is not define')
    }

    state = {
        editMode: false
    }

    _handleRemove = () => {
        const id = this.props.item.id

        this.props.onRemove(id)
    }

    _handleToggle = () => {
        this.setState({
            editMode: !this.state.editMode
        })
    }

    _renderEditView = (item) => {
        return (
            <Card
                key={item.id}
                title="Edit Memo"
                extra={
                    <a
                        className="event-icon"
                        onClick={this._handleToggle}
                    >
                        <Icon type="close" theme="outlined" />
                    </a>}
            >
                <MemoForm item={item} editMode={this.state.editMode} onUpdate={this.props.onUpdate}/>
            </Card>
        )
    }

    _renderMemoView = (item) => {
        return (
            <Card
                extra={[
                    <a
                        className="event-icon"
                        onClick={this._handleToggle}
                    >
                        <Icon type="edit" theme="outlined" />
                    </a>,
                    <a
                        className="event-icon"
                        onClick={this._handleRemove}
                    >
                        <Icon type="close" theme="outlined" />
                    </a>
                ]}
            >
                {item.content}
            </Card>
        )
    }

    render() {
        const { item } = this.props

        return (
            <div className="container-MemoItem">
                {
                    this.state.editMode ? this._renderEditView(item) : this._renderMemoView(item)
                }
            </div>
        )
    }
}

MemoItem.propTypes = {
    item: PropTypes.object.isRequired,
    onRemove: PropTypes.func.isRequired,
    onUpdate: PropTypes.func.isRequired
}

export default MemoItem
