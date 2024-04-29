import { Inject, Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { IdDto, IdsDto } from '../shared/dto'
import { AlbumMediaDto, AlbumUpdateDto } from './album.dto'
import { Prisma } from '@prisma/client'
import { ClsService } from 'nestjs-cls'
import { DrizzleAsyncProvider } from '../drizzle/drizzle.provider'
import * as schema from '../drizzle/schema'
import { NodePgDatabase } from 'drizzle-orm/node-postgres'
import { album, medium, mediumToAlbum, mediumToAlbumRelations } from '../drizzle/schema'
import { and, AnyColumn, count, eq, GetColumnData, getTableColumns, InferColumnsDataTypes, SQL, sql } from 'drizzle-orm'

export function coalesce<T> (value: SQL.Aliased<T> | SQL<T>, defaultValue: SQL) {
    return sql<T>`coalesce(${value}, ${defaultValue})`
}

export function jsonAgg<Column extends AnyColumn> (column: Column) {
    return coalesce<GetColumnData<Column, 'raw'>[]>(
        sql`json_agg(distinct ${sql`${column}`}) filter (where ${column} is not null)`,
        sql`'[]'`
    )
}

@Injectable()
export class AlbumRepository {
    constructor (private prisma: PrismaService, private cls: ClsService, @Inject(DrizzleAsyncProvider) private db: NodePgDatabase<typeof schema>) {}

    async all () {
        return this.prisma.album.findMany({
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
                        uploader: true,
                        tags: true
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
        return this.db.query.album.findMany({
            where: (album, { inArray }) => inArray(album.id, dto.ids)
        })
    }

    async findManyByMedium (dto: IdDto) {
        const mediaOfAlbum = this.db.$with('mediaOfAlbum').as(
            this.db.select({
                id: album.id,
                count: sql<number>`cast(count(${medium.id}) as int)`.as('count')
            }).from(album)
                .leftJoin(mediumToAlbum, eq(album.id, mediumToAlbum.idAlbum))
                .leftJoin(medium, eq(mediumToAlbum.idMedium, medium.id))
                .where(eq(medium.status, 'all'))
                .groupBy(album.id)
        )

        const albumsOfMedium = this.db.$with('albumsOfMedium').as(
            this.db.select({
                id: mediumToAlbum.idAlbum
            }).from(mediumToAlbum).where(eq(mediumToAlbum.idMedium, dto.id))
        )

        const covers = this.db.$with('covers').as(
            this.db.with(albumsOfMedium).select({
                id: medium.id,
                filenameDisk: medium.filenameDisk,
                mimetype: medium.mimetype
            }).from(medium)
                .leftJoin(album, eq(album.idCover, medium.id))
                .rightJoin(albumsOfMedium, eq(album.id, albumsOfMedium.id))
        )

        return this.db.with(mediaOfAlbum, albumsOfMedium, covers).select({
            id: album.id,
            title: album.title,
            count: mediaOfAlbum.count,
            cover: {
                id: covers.id,
                mimetype: covers.mimetype,
                filenameDisk: covers.filenameDisk
            }
        }).from(album)
            .leftJoin(mediaOfAlbum, eq(album.id, mediaOfAlbum.id))
            .leftJoin(covers, eq(album.idCover, covers.id))
            .rightJoin(albumsOfMedium, eq(album.id, albumsOfMedium.id))
    }

    async findOneById (dto: IdDto) {
        const media = this.db.$with('media').as(
            this.db.select().from(medium)
                .leftJoin(mediumToAlbum, eq(mediumToAlbum.idMedium, medium.id))
                .where(and(
                    eq(mediumToAlbum.idAlbum, dto.id),
                    eq(medium.status, 'all')
                ))
        )

        const cover = this.db.$with('cover').as(
            this.db.select().from(medium)
                .leftJoin(album, eq(album.idCover, medium.id))
        )

        // const s = await this.db.select(foo.medium).from(foo)

        const {
            idCover, idOwner, ...columns
        } = getTableColumns(album)

        const selectedAlbum = await this.db.with(media, cover).select({
            ...columns,
            media: jsonAgg(media.medium)
            // cover: cover.medium
        }).from(album).leftJoin(mediumToAlbum, eq(mediumToAlbum.idAlbum, album.id)).leftJoin(media, eq(media.medium_to_album.idAlbum, album.id)).groupBy(album.id)
        // .leftJoin(media, eq(album.id, media.medium_to_album.idAlbum))
        // .leftJoin(cover, eq(album.idCover, cover.medium.id))
        // .where(eq(album.id, dto.id))

        console.log(selectedAlbum)

        // const res = await this.db.query.album.findFirst({
        //     where: (album, { eq }) => eq(album.id, dto.id),
        //     with: {
        //         owner: true,
        //         cover: true,
        //         media: {
        //             with: {
        //                 medium: true
        //             }
        //         }
        //     }
        // })
        // const sss = this.db.query.album.findFirst({
        //     where: (album, { eq }) => eq(album.id, dto.id),
        //     with: {
        //         owner: true,
        //         cover: true,
        //         media: {
        //             with: {
        //                 medium: true
        //             }
        //         }
        //     }
        // }).toSQL()
        // console.log(res, sss)
        return {
            media: []
        }
        // return this.prisma.album.findUnique({
        //     where: {
        //         id: dto.id
        //     },
        //     include: {
        //         media: {
        //             include: {
        //                 tags: true,
        //                 favoredBy: true,
        //                 owner: true,
        //                 uploader: true
        //             }
        //         },
        //         owner: true,
        //         cover: true
        //     }
        // })
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

    async removeMedia (dto: AlbumMediaDto) {
        await this.prisma.album.update({
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

        return await this.findOneById({
            id: dto.id
        })
    }

    async update (dto: AlbumUpdateDto) {
        const {
            id, cover, ...data
        } = dto
        return this.prisma.album.update({
            where: {
                id
            },
            data: {
                ...data,
                cover: cover ? {
                    connect: {
                        id: cover
                    }
                } : undefined
            }
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
