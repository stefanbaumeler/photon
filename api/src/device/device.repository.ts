import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { IdDto } from '../shared/dto'

@Injectable()
export class DeviceRepository {
    constructor (private prisma: PrismaService) {}

    async findByUser (dto: IdDto) {
        return this.prisma.user.findFirst({
            where: {
                id: dto.id
            },
            select: {
                devices: true
            }
        })
    }
}
