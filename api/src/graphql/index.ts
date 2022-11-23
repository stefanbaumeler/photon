import albums from './albums'
import media from './media'
import users from './users'
import { gql } from 'apollo-server-express'
import { mergeTypeDefs } from '@graphql-tools/merge'
import { TMetaResolvers, TVideoMeta } from '@photon/shared'
import UsersService from '../services/users'

const global = gql`
    scalar Upload

    type File {
        url: String
    }
`

const typeDefs = mergeTypeDefs([global, users.typeDefs, media.typeDefs, albums.typeDefs])

const resolvers = {
    Medium: {
        owner: (obj: { owner: string }) => {
            return new UsersService().readOne(obj.owner)
        },
        uploader: (obj: { uploader: string }) => {
            return new UsersService().readOne(obj.uploader)
        }
    },
    Album: {
        owner: (obj: { owner: string }) => {
            return new UsersService().readOne(obj.owner)
        }
    },
    Meta: {
        __resolveType (meta) {
            const videoMeta = meta as TVideoMeta

            if (videoMeta.duration) {
                return 'VideoMeta'
            }

            return 'ImageMeta'
        }
    } as TMetaResolvers,
    Query: {
        ...users.resolvers.queries,
        ...media.resolvers.queries,
        ...albums.resolvers.queries
    },
    Mutation: {
        ...users.resolvers.mutations,
        ...media.resolvers.mutations,
        ...albums.resolvers.mutations
    }
}

export {
    resolvers,
    typeDefs
}
