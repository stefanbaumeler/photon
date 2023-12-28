import { Injectable } from '@nestjs/common'
import { FavoriteRepository } from './favorite.repository'
import { IdDto, IdsDto } from '../shared/dto'
@Injectable()
export class FavoriteService {
    constructor (private repository: FavoriteRepository) {}

    async own () {
        return this.repository.findByUser({
            id: ''
        })
    }

    async delete (dto: IdsDto) {
        return this.repository.deleteMany(dto)
    }

    async insert (dto: IdsDto) {
        return this.repository.insertMany(dto)
    }
}
