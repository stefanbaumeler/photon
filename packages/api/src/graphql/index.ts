import albums from './albums'
import media from './media'
import users from './users'
import gql from 'graphql-tag'
import { mergeTypeDefs } from '@graphql-tools/merge'
import UsersService from '../services/users'
import { DateTimeScalar } from 'graphql-date-scalars'
import { TUser, TMeta, TMetaResolvers, TVideoMeta } from '../database'

const global = gql`
    directive @auth on OBJECT | FIELD_DEFINITION

    scalar Upload
    scalar Date

    type File {
        url: String
    }
`

const typeDefs = mergeTypeDefs([global, users.typeDefs, media.typeDefs, albums.typeDefs])

const resolvers = {
    Date: DateTimeScalar,
    Medium: {
        owner: (obj: { owner: TUser }) => {
            return new UsersService().readOne(obj.owner.id)
        },
        uploader: (obj: { uploader: TUser }) => {
            return new UsersService().readOne(obj.uploader.id)
        },
        meta: (obj: { meta: string }) => {
            return JSON.parse(obj.meta) as TMeta
        }
    },
    Album: {
        owner: (obj: { owner: TUser }) => {
            return new UsersService().readOne(obj.owner.id)
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
