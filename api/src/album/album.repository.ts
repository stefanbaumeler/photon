import { Inject, Injectable } from '@nestjs/common'
import { IdDto, IdsDto } from '../shared/dto'
import { AlbumCreateDto, AlbumMediaDto, AlbumUpdateDto } from './album.dto'
import { ClsService } from 'nestjs-cls'
import { DrizzleAsyncProvider } from '../drizzle/drizzle.provider'
import * as schema from '../drizzle/schema'
import { NodePgDatabase } from 'drizzle-orm/node-postgres'
import { album, medium, mediumToAlbum, user } from '../drizzle/schema'
import { and, count, eq, getTableColumns, inArray } from 'drizzle-orm'
import { alias } from 'drizzle-orm/pg-core'
import { getManyToMany, TAlbumInclude } from '../drizzle/helpers'

@Injectable()
export class AlbumRepository {
    constructor (private cls: ClsService, @Inject(DrizzleAsyncProvider) private db: NodePgDatabase<typeof schema>) { }

    columns = getTableColumns(album)

    findBy ({ include = {} }: { include?: TAlbumInclude } = {}) {
        const media = getManyToMany('media', album, mediumToAlbum, medium, ['idAlbum', 'idMedium'])
            // .where(eq(medium.status, 'all'))
            .as('mediaQuery')

        const {
            idCover, idOwner, ...columns
        } = this.columns

        const cover = alias(medium, 'cover')

        return this.db.with(media)
            .select({
                ...columns,
                cover: getTableColumns(cover),
                media: media.result,
                ...include.owner ? {
                    owner: getTableColumns(user)
                } : {}
            })
            .from(album)
            .innerJoin(user, eq(user.id, album.idOwner))
            .leftJoin(mediumToAlbum, eq(mediumToAlbum.idAlbum, album.id))
            .innerJoin(media, eq(album.id, media.id))
            .leftJoin(cover, eq(album.idCover, cover.id))
            .groupBy(album.id, media.result, cover.id, cover.mimetype, cover.filenameDisk, user.id)
    }

    async all () {
        const query = this.findBy({
            include: {
                owner: true
            }
        })

        return query.where(eq(album.idOwner, this.cls.get('userId')))
    }

    async findMany (dto: IdsDto) {
        return this.db.query.album.findMany({
            where: (album, { inArray }) => inArray(album.id, dto.ids)
        })
    }

    async findManyByMedium (dto: IdDto) {
        const cover = alias(medium, 'cover')

        const mediaCountOfAlbum = this.db.select({
            id: album.id,
            count: count(medium.id).as('count')
        }).from(album)
            .leftJoin(mediumToAlbum, eq(album.id, mediumToAlbum.idAlbum))
            .leftJoin(medium, eq(mediumToAlbum.idMedium, medium.id))
            .where(eq(medium.status, 'all'))
            .groupBy(album.id).as('mediaCountOfAlbum')

        const albumsOfMedium = this.db.select({
            id: mediumToAlbum.idAlbum
        }).from(mediumToAlbum).where(eq(mediumToAlbum.idMedium, dto.id)).as('albumsOfMedium')

        const {
            idCover, idOwner, ...columns
        } = this.columns

        const res = await this.db.with(mediaCountOfAlbum, albumsOfMedium).select({
            ...columns,
            count: mediaCountOfAlbum.count,
            cover: getTableColumns(cover)
        }).from(album)
            .innerJoin(mediaCountOfAlbum, eq(album.id, mediaCountOfAlbum.id))
            .leftJoin(cover, eq(album.idCover, cover.id))
            .rightJoin(albumsOfMedium, eq(album.id, albumsOfMedium.id))

        return res
    }

    async findById (dto: IdDto) {
        const albums = this.findBy({
            include: {
                owner: true
            }
        })

        const selectedAlbum = await albums.where(eq(album.id, dto.id))

        return selectedAlbum[0]
    }

    async deleteMany (dto: IdsDto) {
        await this.db
            .delete(mediumToAlbum)
            .where(inArray(mediumToAlbum.idAlbum, dto.ids))

        return this.db
            .delete(album)
            .where(inArray(album.id, dto.ids)).returning(this.columns)
    }

    async addMedia (dto: AlbumMediaDto) {
        await this.db.insert(mediumToAlbum).values(dto.media.map((mediumToAdd) => {
            return {
                idMedium: mediumToAdd,
                idAlbum: dto.id
            }
        }))

        return this.findById({
            id: dto.id
        })
    }

    async removeMedia (dto: AlbumMediaDto) {
        await this.db.delete(mediumToAlbum).where(and(eq(mediumToAlbum.idAlbum, dto.id), inArray(mediumToAlbum.idMedium, dto.media)))

        return await this.findById({
            id: dto.id
        })
    }

    async update (dto: AlbumUpdateDto) {
        const {
            id, cover, ...data
        } = dto

        return this.db.update(album).set({
            ...data,
            idCover: cover
        }).where(eq(album.id, id)).returning(this.columns)
    }

    async create (albumToCreate: AlbumCreateDto) {
        const createdAlbum = await this.db.insert(album).values({
            ...albumToCreate,
            idCover: albumToCreate.cover,
            idOwner: this.cls.get('userId')
        }).returning({
            id: album.id
        })

        await this.db.insert(mediumToAlbum).values(albumToCreate.media.map((id) => {
            return {
                idAlbum: createdAlbum[0].id,
                idMedium: id
            }
        }))

        return this.findById({
            id: createdAlbum[0].id
        })
    }
}
