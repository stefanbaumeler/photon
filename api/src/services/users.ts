import { TUser } from '@photon/shared'
import { getDatabase } from '../database'
import argon2 from 'argon2'
import jwt, { JwtPayload } from 'jsonwebtoken'
import { Response } from 'express'

export default class UsersService {
    prisma = getDatabase()

    async truncate () {
        return this.prisma.user.deleteMany({
            where: {}
        })
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

    createMany = (users: Pick<TUser, 'firstName' | 'lastName' | 'mail' | 'password'>[]) => new Promise<number>((resolve) => {
        const hashPromises: Promise<Pick<TUser, 'firstName' | 'lastName' | 'mail' | 'password'>>[] = []

        users.forEach((user) => {
            const promise = argon2.hash(user.password).then((hashedPassword) => {
                user.password = hashedPassword

                return user
            })

            hashPromises.push(promise)
        })

        Promise.all(hashPromises).then((hashedUsers) => {
            this.prisma.user.createMany({
                data: hashedUsers,
                skipDuplicates: true
            }).then((res) => {
                resolve(res.count)
            })
        })
    })

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

    setUserCookie = async (user: TUser, res: Response) => {
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

        res.cookie('accessToken', accessToken, {
            httpOnly: true,
            secure: true,
            maxAge: 30 * 24 * 60 * 60 * 1000
        })

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: true,
            maxAge: 30 * 24 * 60 * 60 * 1000
        })

        return {
            accessToken,
            refreshToken
        }
    }

    signup = async (user: Pick<TUser, 'firstName' | 'lastName' | 'mail' | 'password'>, res: Response) => {
        const oldUser = await this.readOneByMail(user.mail)

        if (oldUser) {
            return {
                accessToken: '',
                refreshToken: ''
            }
        }

        const createdUser = await this.createOne(user)
        return this.setUserCookie(createdUser, res)
    }

    signIn = async (credentials: Pick<TUser, 'mail' | 'password'>, res: Response) => {
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

        return this.setUserCookie(existingUser, res)
    }

    signOut = (res: Response) => new Promise<boolean>((resolve) => {
        res.clearCookie('accessToken')
        res.clearCookie('refreshToken')

        resolve(true)
    })

    refresh = (refreshToken: string, accessToken: string, res: Response) => {
        try {
            console.log(refreshToken)
            const refreshTokenValid = jwt.verify(refreshToken, process.env.JWT_SECRET as string)
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

        res.cookie('accessToken', newAccessToken, {
            httpOnly: true,
            secure: true,
            maxAge: 30 * 24 * 60 * 60 * 1000
        })

        return newAccessToken
    }
}
