import { TUser, TToken } from '@photon/shared'
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

    signup = (user: Pick<TUser, 'firstName' | 'lastName' | 'mail' | 'password'>, res: Response) => new Promise<TToken>( (resolve) => {
        this.readOneByMail(user.mail).then((oldUser) => {
            if (oldUser) {
                resolve({
                    accessToken: '',
                    refreshToken: ''
                })
                return
            }

            this.createOne(user).then((user) => {
                const accessToken = jwt.sign(
                    {
                        id: user.id,
                        mail: user.mail
                    },
                    'MySecret',
                    {

                        expiresIn: '10min'
                    }
                )

                const refreshToken = jwt.sign(
                    {
                        id: user.id,
                        mail: user.mail
                    },
                    'MySecret',
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

                resolve({
                    accessToken,
                    refreshToken
                })
            })
        })
    })

    signIn = (credentials: Pick<TUser, 'mail' | 'password'>, res: Response) => new Promise<TToken>((resolve) => {
        this.readOneByMail(credentials.mail).then((user) => {
            if (!user) {
                resolve({
                    accessToken: '',
                    refreshToken: ''
                })
                return
            }

            argon2.verify(user.password, credentials.password).then((match) => {
                if (!match) {
                    resolve({
                        accessToken: '',
                        refreshToken: ''
                    })
                    return
                }

                const accessToken = jwt.sign(
                    {
                        id: user.id,
                        mail: user.mail
                    },
                    'MySecret',
                    {
                        expiresIn: '10min'
                    }
                )

                const refreshToken = jwt.sign(
                    {
                        id: user.id,
                        mail: user.mail
                    },
                    'MySecret',
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

                resolve({
                    accessToken,
                    refreshToken
                })
            })
        })
    })

    signOut = (res: Response) => new Promise<boolean>((resolve) => {
        res.clearCookie('accessToken')
        res.clearCookie('refreshToken')

        resolve(true)
    })

    refresh = (refreshToken: string, accessToken: string, res: Response) => {
        try {
            console.log(refreshToken)
            const refreshTokenValid = jwt.verify(refreshToken, 'MySecret')
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
            'MySecret',
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
