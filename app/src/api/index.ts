import { ApolloClient, from } from '@apollo/client'
import { cache } from './cache'
import { onError } from '@apollo/client/link/error'
import { createUploadLink } from 'apollo-upload-client'

const errorLink = onError((error) => {
    console.log(error.operation.variables, error.operation.operationName, error.networkError, error.graphQLErrors)
})

const uploadLink = createUploadLink({
    uri: process.env.NEXT_PUBLIC_API_URL,
    credentials: 'include',
    headers: {
        'Apollo-Require-Preflight': 'true'
    }
})

const client = new ApolloClient({
    connectToDevTools: true,
    cache,
    link: from([errorLink, uploadLink])
})

export { client }
