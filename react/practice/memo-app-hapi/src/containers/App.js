import React, { Component } from 'react';

import { Header, MemoForm, MemoList } from './../components/index'

import { connect } from 'react-redux'
import * as memoActions from './../actions/memo'


import { Layout } from 'antd'
import {bindActionCreators} from "redux";

const { Content } = Layout

class App extends Component {

    _onCreate = (value) => {
        const { MemoAction } = this.props

        MemoAction.memoAdd(value)
    }

    _onRemove = (id) => {
        const { MemoAction } = this.props

        MemoAction.memoRemove(id)
    }

    _onUpdate = (value) => {
        const { MemoAction } = this.props

        MemoAction.memoUpdate(value)
    }

    render() {
        console.log(this.props.memo)
        return (
            <Layout>
                <Header />
                <Content style={{ padding: '0 50px', marginTop: 100 }}>
                    <MemoForm
                        onCreate={this._onCreate}
                    />

                    <hr />

                    <MemoList
                        memos={this.props.memo}
                        onRemove={this._onRemove}
                        onUpdate={this._onUpdate}
                    />
                </Content>
            </Layout>
        )
    }
}

export default connect(
    (state) => ({
        memo: state.memos
    }),
    (dispatch) => ({
        MemoAction: bindActionCreators(memoActions, dispatch)
    })
)(App)
