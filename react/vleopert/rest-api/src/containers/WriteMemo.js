import React, { Component } from 'react'
import enhanceWithClickOutside from 'react-click-outside'

import { WhiteBox, InputPlaceholder } from 'components/WriteMemo'
import InputForm  from 'components/Shared/InputForm'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import * as memoActions from 'modules/memo'

class WriteMemo extends Component {
    state = {
        focused: false
    }

    handleFocus =() => {
        const {focused} = this.state

        if (!focused) {
            this.setState({
                focused: !focused
            })
        }
    }

    handleClickOutside() {
        const { focused } = this.state

        if (focused) {
            this.setState({
                focused: !focused
            })
        }
    }

    _onCreate = async (value) => {
        const { MemoAction, cursor, data } = this.props

        console.log(cursor)

        try {
            await MemoAction.createMemo(value)

            console.log(data)
            console.log(cursor)

            await MemoAction.getRecentMemo(cursor ? cursor : 0)

        } catch (e) {
            console.log(e)
        }
    }

    render() {
        const { focused } = this.state

        return (
            focused ? (
                <WhiteBox>
                    <InputForm
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
        cursor: state.data.length
    }),
    (dispatch) => ({
        MemoAction: bindActionCreators(memoActions, dispatch)
    })
)(enhanceWithClickOutside(WriteMemo))
