import React, { Component } from 'react'

import Header from 'components/Header.js'
import Layout from 'components/Layout'

class App extends Component {
    render() {
        return (
            <Layout>
                <Header />

                <Layout.Main>Test</Layout.Main>
            </Layout>

        )
    }
}

export default App
