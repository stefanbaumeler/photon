import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { JwtPayload, JwtPayloadWithRefreshToken } from '../auth.types'
import { Request } from 'express'

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
    constructor () {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretKey: process.env.JWT_REFRESH_SECRET,
            passReqToCallback: true
        })
    }
    async validate (req: Request, payload: JwtPayload): Promise<JwtPayloadWithRefreshToken> {
        const refreshToken = req?.get('authorization')?.replace('Bearer', '').trim()

        return {
            ...payload,
            refreshToken
        }
    }
}
