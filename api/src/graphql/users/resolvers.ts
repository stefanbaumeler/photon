import UsersService from '../../services/users'
import { TQueryResolvers, TMutationResolvers } from '@photon/schema'

const queries: Partial<TQueryResolvers> = {
    users: (_, input, context) =>  new UsersService(context).readMany(),
    user: (_, input, context) => new UsersService(context).readOne(input.id)
}

const mutations: Partial<TMutationResolvers> = {
    signIn: (_, input, context) => {
        return new UsersService(context).signIn(input)
    },
    signOut: (_, input, context) => {
        return new UsersService(context).signOut()
    },
    signUp: (_, input, context) => new UsersService(context).signUp(input)
}

export default {
    queries,
    mutations
}
