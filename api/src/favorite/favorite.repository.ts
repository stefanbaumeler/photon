import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { IdDto, IdsDto } from '../shared/dto'
import { ClsService } from 'nestjs-cls'

@Injectable()
export class FavoriteRepository {
    constructor (private prisma: PrismaService, private cls: ClsService) {}

    async findByUser (dto: IdDto) {
        return this.prisma.medium.findMany({
            where: {
                favoredBy: {
                    some: {
                        id: dto.id
                    }
                }
            },
            include: {
                owner: true,
                uploader: true,
                tags: true,
                favoredBy: {
                    where: {
                        id: this.cls.get('userId')
                    }
                }
            }
        })
    }

    async insertMany (dto: IdsDto) {
        return this.prisma.user.update({
            where: {
                id: this.cls.get('userId')
            },
            data: {
                favorites: {
                    connect: dto.ids.map((id) => ({
                        id
                    }))
                }
            }
        })
    }

    async deleteMany (dto: IdsDto) {
        return this.prisma.user.update({
            where: {
                id: this.cls.get('userId')
            },
            data: {
                favorites: {
                    disconnect: dto.ids.map((id) => ({
                        id
                    }))
                }
            }
        })
    }
}
