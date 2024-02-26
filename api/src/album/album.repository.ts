import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { IdDto, IdsDto } from '../shared/dto'
import { AlbumMediaDto, AlbumUpdateDto } from './album.dto'
import { Prisma } from '@prisma/client'
import { ClsService } from 'nestjs-cls'

@Injectable()
export class AlbumRepository {
    constructor (private prisma: PrismaService, private cls: ClsService) {}

    async all () {
        return await this.prisma.album.findMany({
            where: {
                owner: {
                    id: this.cls.get('userId')
                }
            },
            include: {
                owner: true,
                media: {
                    include: {
                        favoredBy: {
                            where: {
                                id: this.cls.get('userId')
                            }
                        },
                        owner: true,
                        uploader: true
                    }
                },
                cover: {
                    include: {
                        owner: true,
                        uploader: true,
                        favoredBy: {
                            where: {
                                id: this.cls.get('userId')
                            }
                        }
                    }
                }
            }
        })
    }

    async findMany (dto: IdsDto) {
        return this.prisma.album.findMany({
            where: {
                id: {
                    in: dto.ids
                }
            }
        })
    }

    async findManyByMedium (dto: IdDto) {
        return this.prisma.album.findMany({
            where: {
                media: {
                    every: {
                        id: dto.id
                    }
                }
            }
        })
    }

    async findOneById (dto: IdDto) {
        return this.prisma.album.findUnique({
            where: {
                id: dto.id
            },
            include: {
                media: {
                    include: {
                        tags: true,
                        favoredBy: true,
                        owner: true,
                        uploader: true
                    }
                },
                owner: true,
                cover: true
            }
        })
    }

    async deleteMany (dto: IdsDto) {
        return this.prisma.album.deleteMany({
            where: {
                id: {
                    in: dto.ids
                }
            }
        })
    }

    async addMedia (dto: AlbumMediaDto) {
        return this.prisma.album.update({
            where: {
                id: dto.id
            },
            data: {
                media: {
                    connect: dto.media.map((mediumToAdd) => {
                        return {
                            id: mediumToAdd
                        }
                    })
                }
            }
        })
    }

    async removeMedia (dto: AlbumMediaDto) {
        return this.prisma.album.update({
            where: {
                id: dto.id
            },
            data: {
                media: {
                    disconnect: dto.media.map((mediumToRemove) => {
                        return {
                            id: mediumToRemove
                        }
                    })
                }
            },
            include: {
                owner: true,
                cover: {
                    include: {
                        owner: true
                    }
                }
            }
        })
    }

    async update (dto: AlbumUpdateDto) {
        const {
            id, ...data
        } = dto

        return this.prisma.album.update({
            where: {
                id
            },
            data
        })
    }

    async create (album: Prisma.AlbumCreateInput) {
        const media = album.media as string[]

        if (media?.length) {
            album.cover = {
                connect: {
                    id: media[0]
                }
            }
        }

        return this.prisma.album.create({
            data: {
                ...album,
                cover: album.cover,
                owner: album.owner ? album.owner : {
                    connect: {
                        id: this.cls.get('userId')
                    }
                },
                media: media ? {
                    connect: media.map((id) => ({
                        id
                    }))
                } : undefined
            }
        })
    }
}
