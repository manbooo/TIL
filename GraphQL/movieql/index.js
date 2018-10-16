import { GraphQLServer } from 'graphql-yoga'
import resolvers from "./graphql/resolver"

const server = new GraphQLServer({
    typeDefs: "./graphql/schema.graphql",
    resolvers
})

server.start(() => console.log("GraphQL Server Running"))
