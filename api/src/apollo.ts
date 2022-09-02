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
            deleteMedium(id: ID): String
        }

        type Query {
            media: [Media]
            deleteMedium(id: ID): String
        }
    `

    const resolvers = {
        Query: {
            media: () => new MediaService().readMany()
        },
        Mutation: {
            deleteMedium: async (_: any, input: { id: string }) => new MediaService().destroy(input.id)
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
