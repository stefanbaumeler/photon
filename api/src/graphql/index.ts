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
        ...media.resolvers.queries,
        ...albums.resolvers.queries
    },
    Mutation: {
        ...media.resolvers.mutations,
        ...albums.resolvers.mutations
    }
}

export {
    resolvers,
    typeDefs
}
