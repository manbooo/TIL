import React, { Component } from 'react'

import Header from 'components/Header'
import Layout from 'components/Layout'
import WriteMemo from './WriteMemo'
import MemoListContainer from './MemoListContainer'

import * as memoActions from 'modules/memo'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'


class App extends Component {
    async componentDidMount() {
        const { MemoAction } = this.props

        try {
            await MemoAction.getInitialMemo()

            this.getRecentMemo()
        } catch (e) {
            console.log(e)
        }


    }

    getRecentMemo = () => {
        const { MemoAction, cursor } = this.props

        MemoAction.getRecentMemo(cursor ? cursor : 0)

        setTimeout(() => {
            this.getRecentMemo()
        }, 1000 * 5)
    }

    render() {
        return (
            <Layout>
                <Header />

                <Layout.Main>
                    <WriteMemo />
                    <MemoListContainer />
                </Layout.Main>
            </Layout>

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
)(App)
