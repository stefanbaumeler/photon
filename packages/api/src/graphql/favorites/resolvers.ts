import FavoritesService from '../../services/favorites'
import { TQueryResolvers, TMutationResolvers } from '../../database'

const queries: Partial<TQueryResolvers> = {
    favorites: () => {
        return new FavoritesService().readMany()
    }
}

const mutations: Partial<TMutationResolvers> = {
    addToFavorites: (_, input, context) => {
        return new FavoritesService().createMany(context.user.id, input.media)
    },
    removeFromFavorites: (_, input) => {
        return new FavoritesService().destroyMany(input.media)
    }
}

export default {
    queries,
    mutations
}
