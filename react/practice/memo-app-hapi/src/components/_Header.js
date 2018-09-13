import React, { Component } from 'react'
import { Layout } from 'antd'

const { Header } = Layout

class _Header extends Component {
    render() {
        return (
           <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
               <div style={{color: 'white'}}>
                   My Memo App
               </div>
           </Header>
        )
    }
}


export default _Header
