import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { UserLanguageDto, UserSignUpDto } from './user.dto'
import { JwtService } from '@nestjs/jwt'
import { ConfigService } from '@nestjs/config'
import { ClsService } from 'nestjs-cls'

@Injectable()
export class UserRepository {
    constructor (private prisma: PrismaService, private cls: ClsService) {}

    async users () {
        const raw = await this.prisma.user.findMany()

        return raw.map((user) => {
            return user
        })
    }

    async profile () {
        return this.prisma.user.findUnique({
            where: {
                id: this.cls.get('userId')
            }
        })
    }

    async findOneByMail (mail: string) {
        return this.prisma.user.findFirst({
            where: {
                mail
            }
        })
    }

    async signUp (dto: UserSignUpDto) {
        return this.prisma.user.create({
            data: dto
        })
    }

    async changeLanguage (dto: UserLanguageDto) {
        return this.prisma.user.update({
            where: {
                id: this.cls.get('userId')
            },
            data: {
                language: dto.language
            }
        })
    }
}
