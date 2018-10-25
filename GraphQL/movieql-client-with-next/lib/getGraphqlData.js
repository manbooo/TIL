export default (apolloClient, query, variables) => apolloClient
    .query({
        query,
        variables
    })
    .then(data => {
        return data.data
    })
    .catch(error => {
        return error
    })
