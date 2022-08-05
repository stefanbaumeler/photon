import { ApolloClient, from, HttpLink } from '@apollo/client'
import { cache } from './cache'
import { onError } from '@apollo/client/link/error'

const errorLink = onError(({
    graphQLErrors, networkError
}) => {
    if (graphQLErrors)
    {graphQLErrors.forEach(({
        message, locations, path
    }) =>
        console.log(
            `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
        )
    )}

    if (networkError) {console.log(`[Network error]: ${networkError}`)}
})

const httpLink = new HttpLink({
    uri: 'https://auto-reply-api.staging.1up.io/api/graphql'
})

const client = new ApolloClient({
    cache,
    link: from([errorLink, httpLink])
})

export { client }
