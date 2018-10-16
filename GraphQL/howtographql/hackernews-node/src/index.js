const { GraphQLServer } = require('graphql-yoga')
const { Prisma } = require('prisma-binding')

const resolvers = {
    Query: {
        info: () => 'This is the API of a Hackernews Clone',
        feed: () => (root, args, context, info) => {
            return context.db.query.links({}, info)
        },
    },
    Mutation: {
        post: (root, args, context, info) => {
            return context.db.mutation.createLink({
                data: {
                    url: args.url,
                    description: args.description,
                }
            })
        }
    },
}

const server = new GraphQLServer({
    typeDefs: './src/schema.graphql',
    resolvers,
    context: req => ({
        ...req,
        db: new Prisma({
            typeDefs: 'src/generated/prisma.graphql',
            endpoint: 'https://eu1.prisma.sh/juyeon_park-2f06b1/graphql-tutorial/dev',
            secret: 'mysecret123',
            debug: true,
        })
    })
})

server.start(() => console.log(`Server is running on http://localhost:4000`))
