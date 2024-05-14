import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { AlbumService } from './album.service'
import { Album, FlatAlbum } from './album.model'
import { IdDto, IdsDto } from '../shared/dto'
import { Medium } from '../medium/medium.model'
import { AlbumCreateDto, AlbumMediaDto, AlbumUpdateDto } from './album.dto'

@Resolver(() => Album)
export class AlbumResolver {
    constructor (private readonly service: AlbumService) {}

    @Query(() => [Album])
    async albums () {
        return this.service.getAll()
    }

    @Query(() => [Album])
    async mediumAlbums (@Args() dto: IdDto) {
        return this.service.getByMedium(dto)
    }

    @Query(() => Album)
    async album (@Args() dto: IdDto) {
        return this.service.getById(dto)
    }

    @Query(() => [Medium])
    async albumMedia (@Args() dto: IdDto) {
        const album = await this.service.getById(dto)
        return album?.media
    }

    @Mutation(() => [FlatAlbum])
    async deleteAlbums (@Args() dto: IdsDto) {
        return this.service.delete(dto)
    }

    @Mutation(() => Album)
    async addMediaToAlbum (@Args() dto: AlbumMediaDto) {
        return this.service.addMedia(dto)
    }

    @Mutation(() => Album)
    async removeMediaFromAlbum (@Args() dto: AlbumMediaDto) {
        return this.service.removeMedia(dto)
    }

    @Mutation(() => FlatAlbum)
    async updateAlbum (@Args() dto: AlbumUpdateDto) {
        return this.service.update(dto)
    }

    @Mutation(() => Album)
    async createAlbum (@Args() album: AlbumCreateDto) {
        return this.service.create(album)
    }
}
