import { ApolloClient, from } from '@apollo/client'
import { cache } from './cache'
import { onError } from '@apollo/client/link/error'
import { createUploadLink } from 'apollo-upload-client'
import { setContext } from '@apollo/client/link/context'

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

const uploadLink = createUploadLink({
    uri: process.env.NEXT_PUBLIC_API_URL
})

const authLink = setContext((_, { headers }) => {
    // const token = localStorage.getItem('auth-token')
    const token = 'my-auth-token'
    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : ''
        }
    }
})

const client = new ApolloClient({
    cache,
    link: from([errorLink, authLink.concat(uploadLink)])
})

export { client }
