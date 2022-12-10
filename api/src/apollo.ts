import { ApolloServer } from 'apollo-server-express'
import { Express } from 'express'
import { typeDefs, resolvers } from './graphql'
import jwt from 'jsonwebtoken'
import UsersService from './services/users'
import { predefinedUserUUIDs } from './database/helpers/ids'
import { makeExecutableSchema } from '@graphql-tools/schema'
import { authDirectiveTransformer } from './graphql/directives'

export const createApolloServer = async (app: Express) => {
    let schema = makeExecutableSchema({
        typeDefs,
        resolvers
    })

    schema = authDirectiveTransformer(schema, 'auth')

    const apollo = new ApolloServer({
        schema,
        context: async ({
            req, res
        }) => {
            const service = new UsersService()

            if (process.env.NODE_ENV === 'test') {
                const user = await service.readOne(predefinedUserUUIDs[0])

                if (user) {
                    return {
                        user,
                        verified: true
                    }
                }

                return {
                    verified: true
                }
            }

            const accessToken = req.cookies.accessToken as string
            const refreshToken = req.cookies.refreshToken
            let verified = false
            let userInfo

            try {
                jwt.verify(accessToken, process.env.JWT_SECRET as string)
                userInfo = jwt.decode(accessToken) as { id: string }
                verified = true
            }
            catch {
                const newAccessToken = service.refresh(refreshToken, accessToken, res)

                if (newAccessToken) {
                    userInfo = jwt.decode(newAccessToken) as { id: string }
                    verified = true
                }
            }

            if (userInfo) {
                return {
                    user: await service.readOne(userInfo.id),
                    verified,
                    res
                }
            }

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
            origin: ['http://localhost:3000', 'https://studio.apollographql.com'],
            credentials: true
        }
    })

    return apollo
}
