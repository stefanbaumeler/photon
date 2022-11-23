import { ApolloServer } from 'apollo-server-express'
import { Express } from 'express'
import { typeDefs, resolvers } from './graphql'

export const createApolloServer = async (app: Express) => {
    const apollo = new ApolloServer({
        typeDefs,
        resolvers,
        context: async ({
            req, res
        }) => {
            const token = req.headers.authorization || ''

            // const user = await getUser(token)

            return {
                token
            }
        }
    })

    await apollo.start()

    apollo.applyMiddleware({
        app
    })

    return apollo
}
