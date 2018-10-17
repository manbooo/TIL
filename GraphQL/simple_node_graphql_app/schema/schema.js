const graphql = require('graphql')
const axios = require('axios')

const {
    GraphQLObjectType,
    GraphQLInt,
    GraphQLString,
    GraphQLSchema
} = graphql

// create now User type
const UserType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        id: {type: GraphQLString},
        firstName: {type: GraphQLString},
        lastName: {type: GraphQLString},
        gender: {type: GraphQLString},
        image: {type: GraphQLString},
        age: {type: GraphQLInt},
    })
})

// Create a root query for the schema
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        user: {
            type: UserType,
            args: {id: {type: GraphQLString}},
            resolve(parentValue, args) {
                return axios.get(`http://localhost:3000/users/${args.id}`).then(res => res.data)
            }
        }
    }
})

// export module
module.exports = new GraphQLSchema({
    query: RootQuery
})
