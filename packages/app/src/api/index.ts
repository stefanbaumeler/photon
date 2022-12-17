import { ApolloClient, from } from '@apollo/client'
import { cache } from './cache'
import { onError } from '@apollo/client/link/error'
import { createUploadLink } from 'apollo-upload-client'

const errorLink = onError((error) => {
    console.log(error.operation.variables, error.operation.operationName, error.networkError)
    // if (graphQLErrors) {
    //     graphQLErrors.forEach((err) => {
    //         console.log(err)
    //     })
    // }
    //
    // if (networkError) {
    //     console.log(networkError)
    // }
})

const uploadLink = createUploadLink({
    uri: process.env.NEXT_PUBLIC_API_URL,
    credentials: 'include'
})

const client = new ApolloClient({
    cache,
    link: from([errorLink, uploadLink])
})

export * from './schema'
export { client }
