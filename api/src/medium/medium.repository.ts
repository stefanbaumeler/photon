import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { MediumFilenameDiskDto, MediumStatusDto, MediumUpdateDto, MediumUpdateManyDto } from './medium.dto'
import { IdDto, IdsDto } from '../shared/dto'
import { Prisma } from '@prisma/client'
import { ClsService } from 'nestjs-cls'

@Injectable()
export class MediumRepository {
    constructor (private prisma: PrismaService, private cls: ClsService) {
    }

    async findMany (conditions?: Prisma.MediumWhereInput, order?: Prisma.MediumOrderByWithRelationAndSearchRelevanceInput, include?: Prisma.MediumInclude) {
        return this.prisma.medium.findMany({
            where: conditions,
            include,
            orderBy: order
        })
    }

    async findById (dto: IdDto, include?: Prisma.MediumInclude) {
        return this.prisma.medium.findFirst({
            where: {
                id: dto.id
            },
            include
        })
    }

    async findOneByFilenameDisk (dto: MediumFilenameDiskDto, include?: Prisma.MediumInclude) {
        if (!dto.filenameDisk) {
            // TODO: Error handling
            return
        }

        return this.prisma.medium.findFirst({
            where: {
                filenameDisk: dto.filenameDisk
            },
            include
        })
    }

    async findOneByIdOrHash (dto: Pick<Prisma.MediumCreateInput, 'id'|'hash'>, include?: Prisma.MediumInclude) {
        return this.prisma.medium.findFirst({
            where: {
                OR: [{
                    hash: dto.hash,
                    id: dto.id
                }]
            },
            include
        })
    }

    async findByStatus (dto: MediumStatusDto, include?: Prisma.MediumInclude) {
        return this.prisma.medium.findMany({
            where: {
                status: dto.status
            },
            include
        })
    }

    async findByAlbum (dto: IdDto, conditions?: Prisma.MediumWhereInput, order?: Prisma.MediumOrderByWithRelationAndSearchRelevanceInput, include?: Prisma.MediumInclude) {
        const album = await this.prisma.album.findUnique({
            where: {
                id: dto.id
            },
            include: {
                media: {
                    include,
                    where: conditions,
                    orderBy: order
                }
            }
        })

        return album?.media
    }

    async createOne (medium: Prisma.MediumCreateInput, include?: Prisma.MediumInclude) {
        return this.prisma.medium.create({
            data: medium,
            include
        })
    }

    async deleteMany (dto: IdsDto) {
        return this.prisma.medium.deleteMany({
            where: {
                id: {
                    in: dto.ids
                }
            }
        })
    }

    async count () {
        const ofThisUser = {
            owner: {
                id: this.cls.get('userId')
            }
        }

        const { _count: count } = await this.prisma.medium.aggregate({
            where: ofThisUser,
            _count: true
        })

        const dateSets = await this.prisma.medium.findMany({
            where: ofThisUser,
            select: {
                dateTaken: true,
                dateCreated: true
            }
        })

        return {
            count,
            dateSets
        }
    }

    async update (dto: MediumUpdateDto, include?: Prisma.MediumInclude) {
        const {
            id, ...data
        } = dto

        return this.prisma.medium.update({
            where: {
                id
            },
            data,
            include
        })
    }

    async updateMany (dto: MediumUpdateManyDto) {
        const {
            ids, ...data
        } = dto
        await this.prisma.medium.updateMany({
            where: {
                id: {
                    in: ids
                }
            },
            data
        })

        return this.findMany({
            id: {
                in: ids
            }
        }, undefined, {
            owner: true,
            uploader: true,
            tags: true,
            favoredBy: {
                where: {
                    id: this.cls.get('userId')
                }
            }
        })
    }
}
