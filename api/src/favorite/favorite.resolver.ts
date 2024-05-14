import { Query, Resolver, Args, Mutation } from '@nestjs/graphql'
import { Medium } from '../medium/medium.model'
import { FavoriteService } from './favorite.service'
import { IdsDto } from '../shared/dto'

@Resolver(() => Medium)
export class FavoriteResolver {
    constructor (private readonly service: FavoriteService) {}
    @Query(() => [Medium])
    async favorites () {
        return this.service.own()
    }

    @Mutation(() => Boolean)
    async insertFavorites (@Args() dto: IdsDto) {
        return this.service.insert(dto)
    }

    @Mutation(() => Boolean)
    async deleteFavorites (@Args() dto: IdsDto) {
        return this.service.delete(dto)
    }
}
