import { ApolloServer } from 'apollo-server-express'
import { Express } from 'express'
import { typeDefs, resolvers } from './graphql'
import jwt from 'jsonwebtoken'
import UsersService from './services/users'

export const createApolloServer = async (app: Express) => {
    const apollo = new ApolloServer({
        typeDefs,
        resolvers,
        context: async ({
            req, res
        }) => {
            const accessToken = req.cookies.accessToken as string
            const refreshToken = req.cookies.refreshToken
            let verified = false

            try {
                jwt.verify(accessToken, 'MySecret')
                verified = true
            }
            catch {
                const newAccessToken = new UsersService().refresh(refreshToken, accessToken, res)

                if (newAccessToken) {
                    verified = true
                }
            }

            console.log(verified)
            return {
                verified,
                res
            }
        }
    })

    await apollo.start()

    apollo.applyMiddleware({
        app,
        cors: {
            origin: 'http://localhost:3000',
            credentials: true
        }
    })

    return apollo
}
