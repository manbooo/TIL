const express = require('express')
const expressGraphQL = require('express-graphql')

const app = exporss()
const schema = require('./schema/schema')

app.use('/graphql', expressGraphQL({
    schema,
    graphql: true
}))

app.listen(4000, () => {
    console.log('node app running on post 4000')
})
