import { Knex } from 'knex'
import { TUser, TToken } from '@photon/shared'
import { getDatabase } from '../database'
import argon2 from 'argon2'
import jwt from 'jsonwebtoken'

export default class UsersService {
    knex: Knex

    tableName = 'users'

    constructor () {
        this.knex = getDatabase()
    }

    createOne = (user: Partial<TUser>) => new Promise<TUser>((resolve) => {
        this.knex
            .insert(user)
            .into(this.tableName).returning('*')
            .then((results: TUser[]) => {
                resolve(results[0])
            })
    })

    createMany = (users: Partial<TUser>[]) => new Promise((resolve) => {
        const primaryKeys = users.map((user) => this.createOne(user))

        Promise.all(primaryKeys).then((results) => {
            resolve(results)
        })
    })

    readOne = (id: string) => new Promise<Partial<TUser>>((resolve) => {
        this.knex.select().from(this.tableName).where({
            id
        }).then((res) => {
            resolve(res[0])
        })
    })

    readOneByMail = (mail: string) => new Promise<TUser>((resolve) => {
        this.knex.select().from(this.tableName).where({
            mail
        }).then((res) => {
            resolve(res[0])
        })
    })

    readMany = (limit = 100) => new Promise<TUser[]>((resolve) => {
        this.knex.from(this.tableName).select().limit(limit).then((res) => {
            resolve(res)
        })
    })

    signup = (user: Pick<TUser, 'firstName' | 'lastName' | 'mail' | 'password'>) => new Promise<TToken>( (resolve) => {
        this.readOneByMail(user.mail).then((oldUser) => {
            if (oldUser) {
                resolve({
                    accessToken: ''
                })
                return
            }

            argon2.hash(user.password).then((encryptedPassword) => {
                this.createOne({
                    mail: user.mail,
                    password: encryptedPassword
                }).then((user) => {
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

                    // res.cookie('jwt', refreshToken, {
                    //     httpOnly: true,
                    //     sameSite: 'None',
                    //     secure: true,
                    //     maxAge: 24 * 60 * 60 * 1000
                    // })

                    resolve({
                        accessToken
                    })
                })
            })
        })
    })

    login = (credentials: Pick<TUser, 'mail' | 'password'>) => new Promise<TToken>((resolve) => {
        this.readOneByMail(credentials.mail).then((user) => {
            if (!user) {
                resolve({
                    accessToken: ''
                })
                return
            }

            argon2.verify(user.password, credentials.password).then((match) => {
                if (!match) {
                    resolve({
                        accessToken: ''
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
                        expiresIn: '10min'
                    }
                )

                resolve({
                    accessToken
                })
            })
        })
    })

    verify = () => {
        // return jwt.verify()
    }
}
