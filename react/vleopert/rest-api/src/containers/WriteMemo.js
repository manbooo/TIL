import React, { Component } from 'react'
import enhanceWithClickOutside from 'react-click-outside'

import { WhiteBox, InputPlaceholder } from 'components/WriteMemo'
import InputForm  from 'components/Shared/InputForm'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import * as memoAction from 'modules/memo'

class WriteMemo extends Component {
    state = {
        focused: false
    }

    handleFocus =() => {
        const { focused } = this.state

        this.setState({
            focused: !focused
        })

        console.log(this.state.focused)
    }

    handleClickOutside() {
        const { focused } = this.state

        this.setState({
            focused: !focused
        })

        console.log(this.state.focused)
    }

    _onCreate = async (value) => {
        const { MemoAction } = this.props

        try {
            await MemoAction.createMemo(value)

        } catch (e) {
            console.log(e)
        }
    }

    render() {
        const { focused } = this.state
        const { title, body } = this.props

        return (
            focused ? (
                <WhiteBox>
                    <InputForm
                        title={title}
                        body={body}
                        onCreate={this._onCreate}
                    />
                </WhiteBox>
            ) : (
                <WhiteBox onClick={this.handleFocus}>
                    <InputPlaceholder/>
                </WhiteBox>
            )
        )
    }
}

export default connect(
    (state) => ({
        title: state.title,
        body: state.body
    }),
    (dispatch) => ({
        MemoAction: bindActionCreators(memoAction, dispatch)
    })
)(enhanceWithClickOutside(WriteMemo))
