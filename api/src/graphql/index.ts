import albums from './albums'
import media from './media'
import { gql } from 'apollo-server-express'
import { mergeTypeDefs } from '@graphql-tools/merge'

const global = gql`
    scalar Upload

    type File {
        url: String
    }
`

const typeDefs = mergeTypeDefs([global, media.typeDefs, albums.typeDefs])

const resolvers = {
    Query: {
        ...albums.resolvers.queries,
        ...media.resolvers.queries
    },
    Mutation: {
        ...albums.resolvers.mutations,
        ...media.resolvers.mutations
    }
}

export {
    resolvers,
    typeDefs
}
