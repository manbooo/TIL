import React, { Component } from 'react'
import enhanceWithClickOutside from 'react-click-outside'

import { WhiteBox, InputPlaceholder } from 'components/WriteMemo'
import InputForm  from 'components/Shared/InputForm'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import * as memoActions from 'modules/memo'

class WriteMemo extends Component {
    state = {
        clicked: false
    }

    handleInputClick =() => {
        const {clicked} = this.state

        if (!clicked) {
            this.setState({
                clicked: !clicked
            })
        }
    }

    handleClickOutside() {
        const { clicked } = this.state

        if (clicked) {
            this.setState({
                clicked: !clicked
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
        const { clicked } = this.state

        return (
            clicked ? (
                <WhiteBox>
                    <InputForm
                        onSubmit={this._onCreate}
                    />
                </WhiteBox>
            ) : (
                <WhiteBox onClick={this.handleInputClick}>
                    <InputPlaceholder/>
                </WhiteBox>
            )
        )
    }
}

export default connect(
    (state) => ({
        cursor: state.memo.data.length
    }),
    (dispatch) => ({
        MemoAction: bindActionCreators(memoActions, dispatch)
    })
)(enhanceWithClickOutside(WriteMemo))
