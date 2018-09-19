import React from 'react'
import Link from 'next/link'
import Head from 'next/head'

import Layout from '../components/shared/Layout'

const Index = () => (
    <Layout>
        <Head>
            <title>
                Index page
            </title>
        </Head>
        
        <h1>Hello, Next.js</h1>

        <h2>
            <Link href="/about">
                <a style={{background: 'black', color: 'white'}}>소개</a>
            </Link>
        </h2>
    </Layout>
)

export default Index
