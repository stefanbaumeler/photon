import { getDatabase } from '../database'
import { TUser } from '@photon/schema'
import argon2 from 'argon2'
import jwt, { JwtPayload } from 'jsonwebtoken'
import { Response } from 'express'

export default class UsersService {
    prisma = getDatabase()

    context

    constructor (context?: { user: { id: string }, res: Response, req: Request }) {
        this.context = context
    }

    createOne = async (user: Pick<TUser, 'firstName' | 'lastName' | 'mail' | 'password'>) => {
        const encryptedPassword = await argon2.hash(user.password)

        return this.prisma.user.create({
            data: {
                ...user,
                password: encryptedPassword
            }
        })
    }

    createMany = async (users: Pick<TUser, 'firstName' | 'lastName' | 'mail' | 'password'>[]) => {
        const hashPromises: Promise<typeof users[0]>[] = []

        users.forEach((user) => {
            const promise = argon2.hash(user.password).then((hashedPassword) => {
                user.password = hashedPassword

                return user
            })

            hashPromises.push(promise)
        })

        const hashedUsers = await Promise.all(hashPromises)
        const createdUsers = await this.prisma.user.createMany({
            data: hashedUsers,
            skipDuplicates: true
        })

        return createdUsers.count as number
    }

    readOne = async (id: string) => {
        const res = await this.prisma.user.findFirst({
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
        return this.prisma.user.findFirst({
            where: {
                mail
            }
        })
    }

    readMany = async (take = 100) => {
        return this.prisma.user.findMany({
            take
        })
    }

    setUserCookie = async (user: TUser, res?: Response) => {
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

    signUp = async (user: Pick<TUser, 'firstName' | 'lastName' | 'mail' | 'password'>) => {
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

    signIn = async (credentials: Pick<TUser, 'mail' | 'password'>) => {
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
}
