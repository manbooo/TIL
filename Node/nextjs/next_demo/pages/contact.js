import React , { Component } from 'react'
import Nav from '../components/Nav'

export default class extends Component {
    static getInitialProps({req}) {
        const renderLocation = req ? 'Server' : 'Client'

        return {
            renderLocation
        }
    }

    render() {
        return (
            <div>
                <h1>Contact Page</h1>
                <Nav />
                <p>
                    This page was rendered
                    on the {this.props.renderLocation}
                </p>
            </div>
        )
    }
}
