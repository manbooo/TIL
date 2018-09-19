import React from 'react'

import Layout from '../components/shared/Layout'

const Search = ({ url }) => {
    return (
        <Layout>
            keyword : { url.query.keyword }
        </Layout>
    )
}

export default Search
