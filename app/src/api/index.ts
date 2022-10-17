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
    uri: process.env.NEXT_PUBLIC_API_URL
})

const client = new ApolloClient({
    cache,
    link: from([errorLink, httpLink])
})

export { client }
