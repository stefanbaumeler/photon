import { ForbiddenException, Injectable } from '@nestjs/common'
import { UserRepository } from './user.repository'
import { UserLanguageDto, UserRefreshTokenDto, UserSignInDto, UserSignUpDto } from './user.dto'
import argon2 from 'argon2'
import { JwtService } from '@nestjs/jwt'
import { ConfigService } from '@nestjs/config'
import { Response } from 'express'
import { JwtPayload } from 'jsonwebtoken'

@Injectable()
export class UserService {
    constructor (private repository: UserRepository, private jwtService: JwtService, private config: ConfigService) {}

    async profile () {
        return this.repository.profile()
    }

    async signIn (dto: UserSignInDto, res: Response) {
        const user = await this.repository.findOneByMail(dto.mail)

        if (!user) {
            throw new ForbiddenException('Invalid credentials')
        }

        const match = await argon2.verify(user.password, dto.password)

        if (!match) {
            throw new ForbiddenException('Invalid credentials')
        }

        const tokens = this.createTokens(user.id, user.mail)

        this.setUserCookies(tokens, res)
        return {
            ...tokens,
            user
        }
    }

    async signOut (res: Response) {
        res.clearCookie('accessToken')
        res.clearCookie('refreshToken')

        return true
    }

    async signUp (dto: UserSignUpDto, res: Response) {
        const hashedPassword = await argon2.hash(dto.password)

        const user = await this.repository.signUp({
            ...dto,
            password: hashedPassword
        })

        const tokens = this.createTokens(user.id, user.mail)

        this.setUserCookies(tokens, res)

        return {
            ...tokens,
            user
        }
    }

    async changeLanguage (dto: UserLanguageDto) {
        return this.repository.changeLanguage(dto)
    }

    setUserCookies (tokens: { accessToken: string, refreshToken: string }, res: Response) {
        const secure = !!parseInt(this.config.get('API_SECURE') || '1', 10)

        res.cookie('accessToken', tokens.accessToken, {
            httpOnly: true,
            secure,
            maxAge: 30 * 24 * 60 * 60 * 1000,
            sameSite: secure ? 'none' : undefined
        })

        res.cookie('refreshToken', tokens.refreshToken, {
            httpOnly: true,
            secure,
            maxAge: 30 * 24 * 60 * 60 * 1000,
            sameSite: secure ? 'none' : undefined
        })
    }

    createTokens (id: string, mail: string) {
        const accessToken = this.jwtService.sign({
            id,
            mail
        }, {
            expiresIn: '10min',
            secret: this.config.get('JWT_SECRET')
        })

        const refreshToken = this.jwtService.sign({
            id,
            mail,
            accessToken
        }, {
            expiresIn: '30d',
            secret: this.config.get('JWT_REFRESH_SECRET')
        })

        return {
            accessToken,
            refreshToken
        }
    }

    async refreshAccessToken (dto: UserRefreshTokenDto, res: Response) {
        const JWT_SECRET = this.config.get('JWT_SECRET')
        const JWT_REFRESH_SECRET = this.config.get('JWT_REFRESH_SECRET')

        try {
            this.jwtService.verify(dto.refreshToken, {
                secret: JWT_REFRESH_SECRET
            })
        }
        catch (e) {
            return false
        }

        const payload = this.jwtService.decode(dto.accessToken) as JwtPayload

        delete payload.iat
        delete payload.exp
        delete payload.nbf
        delete payload.jti

        const newAccessToken = this.jwtService.sign(payload,
            {
                secret: JWT_SECRET,
                expiresIn: '10min'
            }
        )

        const secure = !!parseInt(this.config.get('API_SECURE') || '1', 10)

        res.cookie('accessToken', newAccessToken, {
            httpOnly: true,
            secure,
            maxAge: 30 * 24 * 60 * 60 * 1000,
            sameSite: secure ? 'none' : undefined
        })

        const profile = await this.profile()

        return {
            accessToken: newAccessToken,
            refreshToken: dto.refreshToken,
            user: profile
        }
    }
}
