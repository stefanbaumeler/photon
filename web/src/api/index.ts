import { ApolloClient, from } from '@apollo/client'
import { cache } from './cache'
import { onError } from '@apollo/client/link/error'
import { createUploadLink } from 'apollo-upload-client'

const errorLink = onError((error) => {
    console.log(error.operation.variables, error.operation.operationName, error.networkError, error.graphQLErrors)
})

const uploadLink = createUploadLink({
    uri: process.env.NEXT_PUBLIC_API_URL,
    credentials: parseInt(process.env.NEXT_PUBLIC_API_CREDENTIALS || '1', 10) ? 'include' : '',
    headers: {
        'Apollo-Require-Preflight': 'true'
    }
})

export default new ApolloClient({
    connectToDevTools: true,
    cache,
    link: from([errorLink, uploadLink])
})
