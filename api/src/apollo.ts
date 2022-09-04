import { ApolloServer, gql } from 'apollo-server-express'
import { Express } from 'express'
import MediaService from './services/media'

export const createApolloServer = async (app: Express) => {
    const typeDefs = gql`
        type Media {
            id: ID
            filename_disk: String
            filename_download: String
            title: String
            description: String
            width: Int
            height: Int
        }

        type Mutation {
            deleteMedia(ids: [ID]): String
        }

        type Query {
            media: [Media]
            deleteMedia(ids: [ID]): String
        }
    `

    const resolvers = {
        Query: {
            media: () => new MediaService().readMany()
        },
        Mutation: {
            deleteMedia: async (_: any, input: { ids: string[] }) => new MediaService().destroy(input.ids)
        }
    }

    const apollo = new ApolloServer({
        typeDefs,
        resolvers
    })

    await apollo.start()

    apollo.applyMiddleware({
        app
    })

    return apollo
}
