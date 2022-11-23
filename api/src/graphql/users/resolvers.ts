import UsersService from '../../services/users'
import { TQueryResolvers, TMutationResolvers } from '@photon/shared'

const queries: Partial<TQueryResolvers> = {
    users: () =>  new UsersService().readMany(),
    user: (_, input) => new UsersService().readOne(input.id)
}

const mutations: Partial<TMutationResolvers> = {
    login: (_, input) => new UsersService().login(input),
    signup: (_, input) => new UsersService().signup(input)
}

export default {
    queries,
    mutations
}
