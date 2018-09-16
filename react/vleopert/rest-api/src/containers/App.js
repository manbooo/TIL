import React, { Component } from 'react'

import Header from 'components/Header.js'
import Layout from 'components/Layout'
import WriteMemo from './WriteMemo'

class App extends Component {
    render() {
        return (
            <Layout>
                <Header />

                <Layout.Main>
                    <WriteMemo />
                </Layout.Main>
            </Layout>

        )
    }
}

export default App
