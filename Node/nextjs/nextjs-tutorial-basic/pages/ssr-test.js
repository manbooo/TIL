import React, { Component } from 'react'
import axios from 'axios'

import Layout from '../components/shared/Layout'

class SSRTest extends Component {
    static async getInitialProps ({ req }) {
        const response = await axios.get('https://jsonplaceholder.typicode.com/users')
        return {
            users: response.data
        }
    }

    render() {
        const { users }= this.props

        const userList = users.map(user =>
            <li key={user.id}>{ user.username }</li>
        )

        return (
            <Layout>
                <ul>
                    { userList }
                </ul>
            </Layout>
        )
    }
}

export default SSRTest
