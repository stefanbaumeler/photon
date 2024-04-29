import { Injectable } from '@nestjs/common'
import { AlbumRepository } from './album.repository'
import { IdDto, IdsDto } from '../shared/dto'
import { AlbumCreateDto, AlbumMediaDto, AlbumUpdateDto } from './album.dto'

@Injectable()
export class AlbumService {
    constructor (private repository: AlbumRepository) {}

    async getAll () {
        return this.repository.all()
    }

    async getByMedium (dto: IdDto) {
        return this.repository.findManyByMedium(dto)
    }

    async getById (dto: IdDto) {
        return this.repository.findOneById(dto)
    }

    async delete (dto: IdsDto) {
        return this.repository.deleteMany(dto)
    }

    async addMedia (dto: AlbumMediaDto) {
        return this.repository.addMedia(dto)
    }

    async removeMedia (dto: AlbumMediaDto) {
        return this.repository.removeMedia(dto)
    }

    async update (dto: AlbumUpdateDto) {
        return this.repository.update(dto)
    }

    async create (album: AlbumCreateDto) {
        // return this.repository.create(album)
    }
}
