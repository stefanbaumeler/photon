import { TQueryResolvers, TMutationResolvers } from '@photon/schema'
import FavoritesService from '../../services/favorites'

const queries: Partial<TQueryResolvers> = {
    favorites: (_, input, context) => new FavoritesService(context).readMany()
}

const mutations: Partial<TMutationResolvers> = {
    addToFavorites: (_, input, context) => new FavoritesService(context).create(input.media),
    removeFromFavorites: (_, input, context) => new FavoritesService(context).remove(input.media)
}

export default {
    queries,
    mutations
}
