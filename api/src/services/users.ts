import { TUser } from '@photon/schema'
import argon2 from 'argon2'
import jwt, { JwtPayload } from 'jsonwebtoken'
import { Response } from 'express'
import { DB } from '../database'
import { Prisma } from '@prisma/client'

export default class UsersService {
    constructor (public context?: { user: { id: string }, res: Response, req: Request }) {}

    createOne = async (user: Prisma.UserCreateInput) => {
        const encryptedPassword = await argon2.hash(user.password)

        return DB.user.create({
            data: {
                ...user,
                password: encryptedPassword
            }
        })
    }

    createMany = async (users: Prisma.UserCreateInput[]) => {
        const hashPromises: Promise<typeof users[0]>[] = []

        users.forEach((user) => {
            const promise = argon2.hash(user.password).then((hashedPassword) => {
                user.password = hashedPassword

                return user
            })

            hashPromises.push(promise)
        })

        const hashedUsers = await Promise.all(hashPromises)
        const createdUsers = await DB.user.createMany({
            data: hashedUsers,
            skipDuplicates: true
        })

        return createdUsers.count as number
    }

    readOne = async (id: string) => {
        const res = await DB.user.findFirst({
            where: {
                id
            }
        })

        if (res === null) {
            throw new Error()
        }

        return res
    }

    readOneByMail = async (mail: string) => {
        return DB.user.findFirst({
            where: {
                mail
            }
        })
    }

    readMany = async (take = 100) => {
        return DB.user.findMany({
            take
        })
    }

    setUserCookie = async (user: Awaited<Promise<Prisma.PromiseReturnType<typeof this.createOne>>>, res?: Response) => {
        const accessToken = jwt.sign(
            {
                id: user.id,
                mail: user.mail
            },
            process.env.JWT_SECRET as string,
            {

                expiresIn: '10min'
            }
        )

        const refreshToken = jwt.sign(
            {
                id: user.id,
                mail: user.mail
            },
            process.env.JWT_SECRET as string,
            {
                expiresIn: '30d'
            }
        )

        const secure = !!parseInt(process.env.API_SECURE || '1', 10)

        res?.cookie('accessToken', accessToken, {
            httpOnly: true,
            secure,
            maxAge: 30 * 24 * 60 * 60 * 1000,
            sameSite: secure ? 'none' : undefined
        })

        res?.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure,
            maxAge: 30 * 24 * 60 * 60 * 1000,
            sameSite: secure ? 'none' : undefined
        })

        return {
            accessToken,
            refreshToken
        }
    }

    signUp = async (user: Prisma.UserCreateInput) => {
        const oldUser = await this.readOneByMail(user.mail)

        if (oldUser) {
            return {
                accessToken: '',
                refreshToken: ''
            }
        }

        const createdUser = await this.createOne(user)
        return this.setUserCookie(createdUser, this.context?.res)
    }

    signIn = async (credentials: {  mail: string, password: string }) => {
        const existingUser = await this.readOneByMail(credentials.mail)

        if (!existingUser) {
            return {
                accessToken: '',
                refreshToken: ''
            }
        }

        const match = await argon2.verify(existingUser.password, credentials.password)

        if (!match) {
            return {
                accessToken: '',
                refreshToken: ''
            }
        }

        return this.setUserCookie(existingUser, this.context?.res)
    }

    signOut = () => {
        this.context?.res.clearCookie('accessToken')
        this.context?.res.clearCookie('refreshToken')

        return true
    }

    refresh = (refreshToken: string, accessToken: string, res: Response) => {
        try {
            jwt.verify(refreshToken, process.env.JWT_SECRET as string)
        }
        catch {
            return false
        }

        const payload = jwt.decode(accessToken) as JwtPayload

        delete payload.iat
        delete payload.exp
        delete payload.nbf
        delete payload.jti

        const newAccessToken = jwt.sign(
            payload,
            process.env.JWT_SECRET as string,
            {
                expiresIn: '10min'
            }
        )

        const secure = !!parseInt(process.env.API_SECURE || '1', 10)

        res.cookie('accessToken', newAccessToken, {
            httpOnly: true,
            secure,
            maxAge: 30 * 24 * 60 * 60 * 1000,
            sameSite: secure ? 'none' : undefined
        })

        return newAccessToken
    }

    changeLanguage = async (language: string ) => {
        await DB.user.update({
            where: {
                id: this.context?.user.id
            },
            data: {
                language
            }
        })

        return ''
    }
}
