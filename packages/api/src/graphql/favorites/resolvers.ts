import FavoritesService from '../../services/favorites'
import { TQueryResolvers, TMutationResolvers } from '../../database'

const queries: Partial<TQueryResolvers> = {
    favorites: (_, input, context) => {
        return new FavoritesService().readMany({
            user: {
                id: context.user.id
            }
        })
    }
}

const mutations: Partial<TMutationResolvers> = {
    addToFavorites: (_, input, context) => {
        return new FavoritesService().createMany(context.user.id, input.media)
    },
    removeFromFavorites: (_, input, context) => {
        return new FavoritesService().destroyMany(input.media)
    }
}

export default {
    queries,
    mutations
}
