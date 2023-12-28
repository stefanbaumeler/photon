// import { ContextFunction } from '@apollo/server'
// import { ExpressContextFunctionArgument } from '@apollo/server/express4'
// import UsersService from './services/users'
// import { predefinedUserUUIDs } from './database/helpers/ids'
// import jwt from 'jsonwebtoken'
// import { getEnv } from '../env'
//
// const env = getEnv()
// export const context: ContextFunction<[ExpressContextFunctionArgument]> = async ({
//     req, res
// }) => {
//     const service = new UsersService()
//
//     if (!parseInt(env.API_CREDENTIALS || '1', 10)) {
//         const user = await service.readOne(predefinedUserUUIDs[0])
//
//         if (user) {
//             return {
//                 user,
//                 verified: true
//             }
//         }
//
//         return {
//             verified: true
//         }
//     }
//
//     const accessToken = req.cookies.accessToken
//     const refreshToken = req.cookies.refreshToken
//
//     let verified = false
//     let userInfo
//
//     if (!accessToken) {
//         return {
//             verified,
//             res,
//             req
//         }
//     }
//
//     try {
//         jwt.verify(accessToken, env.JWT_SECRET as string)
//         userInfo = jwt.decode(accessToken) as { id: string }
//         verified = true
//     }
//     catch {
//         const newAccessToken = service.refresh(refreshToken, accessToken, res)
//
//         if (newAccessToken) {
//             userInfo = jwt.decode(newAccessToken) as { id: string }
//             verified = true
//         }
//     }
//
//     if (userInfo) {
//         return {
//             user: await service.readOne(userInfo.id),
//             verified,
//             res
//         }
//     }
//
//     return {
//         verified,
//         res,
//         req
//     }
// }
