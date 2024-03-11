import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { UserChangePasswordDto, UserLanguageDto, UserSignUpDto } from './user.dto'
import { ClsService } from 'nestjs-cls'
import { IdDto } from '../shared/dto'

@Injectable()
export class UserRepository {
    constructor (private prisma: PrismaService, private cls: ClsService) {}

    async users () {
        const raw = await this.prisma.user.findMany()

        return raw.map((user) => {
            return user
        })
    }

    async profile (dto?: IdDto) {
        return this.prisma.user.findUnique({
            where: {
                id: dto?.id ?? this.cls.get('userId')
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

    async changePassword (newPassword: string) {
        await this.prisma.user.update({
            where: {
                id: this.cls.get('userId')
            },
            data: {
                password: newPassword
            }
        })

        return true
    }
}
