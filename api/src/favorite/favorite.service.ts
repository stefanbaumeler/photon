import { Injectable } from '@nestjs/common'
import { FavoriteRepository } from './favorite.repository'
import { IdsDto } from '../shared/dto'
import { ClsService } from 'nestjs-cls'
import { MediumRepository } from '../medium/medium.repository'
@Injectable()
export class FavoriteService {
    constructor (private repository: FavoriteRepository, private mediumRepository: MediumRepository, private cls: ClsService) { }

    async own () {
        return this.mediumRepository.findBy({
            favoriteOf: this.cls.get('userId')
        })
    }

    async delete (dto: IdsDto) {
        return this.repository.deleteMany(dto)
    }

    async insert (dto: IdsDto) {
        return this.repository.insertMany(dto)
    }
}
