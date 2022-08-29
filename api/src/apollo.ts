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

        type Query {
            media: [Media]
        }
    `

    const resolvers = {
        Query: {
            media: () => new MediaService().readMany()
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
