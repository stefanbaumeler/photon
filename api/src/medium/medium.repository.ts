import { Inject, Injectable } from '@nestjs/common'
import { MediumCreateDto, MediumFilenameDiskDto, MediumIdOrHashDto, MediumStatusDto, MediumUpdateDto, MediumUpdateManyDto } from './medium.dto'
import { IdDto, IdsDto } from '../shared/dto'
import { ClsService } from 'nestjs-cls'
import { DrizzleAsyncProvider } from '../drizzle/drizzle.provider'
import { NodePgDatabase } from 'drizzle-orm/node-postgres'
import * as schema from '../drizzle/schema'
import { favorite, medium, mediumToTag, tag, user, mediumToAlbum, album } from '../drizzle/schema'
import { eq, and, getTableColumns, inArray, desc, count, or } from 'drizzle-orm'
import { alias } from 'drizzle-orm/pg-core'
import { TMediumInclude, TOrderBy, getManyToMany } from '../drizzle/helpers'
import { TagRepository } from '../tag/tag.repository'

@Injectable()
export class MediumRepository {
    constructor (private cls: ClsService, private tagRepository: TagRepository, @Inject(DrizzleAsyncProvider) private db: NodePgDatabase<typeof schema>) {
    }

    columns = getTableColumns(medium)

    findBy ({
        include = {}, orderBy = desc(medium.dateTaken), ...props
    }: {
        include?: TMediumInclude
        orderBy?: TOrderBy
        album?: string
        favoriteOf?: string
    } = {}) {
        const owner = alias(user, 'owner')
        const uploader = alias(user, 'uploader')

        const tags = getManyToMany('tags', medium, mediumToTag, tag, ['idMedium', 'idTag']).as('tagsQuery')
        const favoredBy = getManyToMany('favoredBy', medium, favorite, user, ['idMedium', 'idUser']).as('favoredByQuery')
        const albums = getManyToMany('albums', medium, mediumToAlbum, album, ['idMedium', 'idAlbum'], [medium.id, medium.id]).where(eq(album.id, props.album)).as('albumsQuery')

        const {
            idOwner, idUploader, ...columns
        } = this.columns

        const queryWith = []

        if (include.tags) {
            queryWith.push(tags)
        }

        if (include.favoredBy) {
            queryWith.push(favoredBy)
        }

        if (props.album) {
            queryWith.push(albums)
        }

        const query = this.db.with(...queryWith).select({
            ...columns,
            ...include.owner ? {
                owner: getTableColumns(owner)
            } : {},
            ...include.uploader ? {
                uploader: getTableColumns(uploader)
            } : {},
            ...include.tags ? {
                tags: tags.result
            } : {},
            ...include.favoredBy ? {
                favoredBy: favoredBy.result
            } : {}
        })
            .from(medium)
            .innerJoin(owner, eq(owner.id, medium.idOwner))
            .innerJoin(uploader, eq(uploader.id, medium.idUploader))
            .leftJoin(tags, eq(medium.id, tags.id))
            .leftJoin(favoredBy, eq(medium.id, favoredBy.id))
            .orderBy(orderBy)

        const queryWithAlbumCondition = props.album ? query.innerJoin(albums, eq(medium.id, albums.id)) : query
        const queryWithFavoriteCondition = props.favoriteOf ? queryWithAlbumCondition.innerJoin(favorite, and(eq(medium.id, favorite.idMedium), eq(favorite.idUser, props.favoriteOf))) : queryWithAlbumCondition

        return queryWithFavoriteCondition
    }

    async findByOwner (dto: IdDto, include?: TMediumInclude) {
        const query = this.findBy({
            include
        })

        return query.where(eq(medium.idOwner, dto.id))
    }

    async findById (dto: IdDto, include?: TMediumInclude) {
        const query = this.findBy({
            include
        })

        const res = await query.where(eq(medium.id, dto.id))

        return res[0]
    }

    async findByIds (dto: IdsDto, include?: TMediumInclude) {
        const query = this.findBy({
            include
        })

        return await query.where(inArray(medium.id, dto.ids))
    }

    async findByIdOrHash (dto: MediumIdOrHashDto, include?: TMediumInclude) {
        const query = this.findBy({
            include
        })

        const res = await query.where(or(eq(medium.id, dto.id), eq(medium.hash, dto.hash)))

        return res[0]
    }

    async findByStatus (dto: MediumStatusDto, include?: TMediumInclude) {
        const query = this.findBy({
            include
        })

        return query.where(and(eq(medium.status, dto.status), eq(medium.idOwner, this.cls.get('userId'))))
    }

    async createOne (mediumToCreate: MediumCreateDto) {
        const res = await this.db.insert(medium).values({
            ...mediumToCreate,
            idOwner: this.cls.get('userId'),
            idUploader: this.cls.get('userId')
        }).returning(this.columns)

        const createdMedium = res[0]

        const tags = await this.tagRepository.generate(createdMedium)

        this.tagRepository.insert({
            tags,
            idUser: this.cls.get('userId'),
            idMedium: createdMedium[0].id
        })

        return this.findByIdOrHash({
            id: createdMedium[0].id
        })
    }

    async deleteMany (dto: IdsDto) {
        return this.db.transaction(async (tx) => {
            await tx
                .delete(mediumToTag)
                .where(inArray(mediumToTag.idMedium, dto.ids))

            await tx
                .delete(mediumToAlbum)
                .where(inArray(mediumToAlbum.idMedium, dto.ids))

            await tx
                .delete(favorite)
                .where(inArray(favorite.idMedium, dto.ids))

            await this.tagRepository.deleteUnused()

            return tx
                .delete(medium)
                .where(inArray(medium.id, dto.ids))
                .returning(this.columns)
        })
    }

    async count () {
        const query = this.findBy()

        const res = await this.db.with(query.as('countable')).select({
            count: count()
        }).from(query.where(eq(medium.idOwner, this.cls.get('userId'))).as('countable'))

        return res[0].count
    }

    async update (dto: MediumUpdateDto) {
        const {
            id, ...data
        } = dto

        return this.db.update(medium).set({
            ...data
        }).where(eq(medium.id, id)).returning(this.columns)
    }

    async updateMany (dto: MediumUpdateManyDto) {
        const {
            ids, ...data
        } = dto

        return this.db.update(medium).set({
            ...data
        }).where(inArray(medium.id, ids)).returning(this.columns)
    }
}
