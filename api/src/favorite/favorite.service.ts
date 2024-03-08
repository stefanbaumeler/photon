import { Injectable } from '@nestjs/common'
import { FavoriteRepository } from './favorite.repository'
import { IdsDto } from '../shared/dto'
import { ClsService } from 'nestjs-cls'
@Injectable()
export class FavoriteService {
    constructor (private repository: FavoriteRepository, private cls: ClsService) {}

    async own () {
        return this.repository.findByUser({
            id: this.cls.get('userId')
        })
    }

    async delete (dto: IdsDto) {
        return this.repository.deleteMany(dto)
    }

    async insert (dto: IdsDto) {
        return this.repository.insertMany(dto)
    }
}
