import withApollo from 'next-with-apollo'
import ApolloClient from 'apollo-boost'

export default withApollo(({ ctx, headers }) => new ApolloClient({ uri: 'https://movieql-efjmllffyo.now.sh/' }))
