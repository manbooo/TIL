import React, { Component } from 'react';
import {gernerateID, addMemo, removeMemo} from '../lib/memoHelpers'

import { Header, MemoForm, MemoList } from './../components/index'

import { Layout } from 'antd'
const { Content } = Layout

class App extends Component {

    state = {
        memos: [
            {id: 1, content: 'one'},
            {id: 2, content: 'two'},
            {id: 3, content: 'three'}
        ]

    }

    _onCreate = (value) => {
        const newMemo = {id: gernerateID, ...value}
        const updatedMemos = addMemo(this.state.memos, newMemo)

        this.setState({
            memos: updatedMemos
        })

    }

    _onRemove = (id) => {
        const { memos } = this.state

        const result = removeMemo(memos, id)

        this.setState({
            memos: result
        })
    }

    render() {
        return (
            <Layout>
                <Header />
                <Content style={{ padding: '0 50px', marginTop: 100 }}>
                    <MemoForm onCreate={this._onCreate}/>

                    <hr />

                    <MemoList
                        memos={this.state.memos}
                        onRemove={this._onRemove}
                    />
                </Content>
            </Layout>
        )
    }
}

export default App
