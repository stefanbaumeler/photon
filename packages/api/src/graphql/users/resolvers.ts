import UsersService from '../../services/users'
import { TQueryResolvers, TMutationResolvers } from '../../database'

const queries: Partial<TQueryResolvers> = {
    users: () =>  new UsersService().readMany(),
    user: (_, input) => new UsersService().readOne(input.id)
}

const mutations: Partial<TMutationResolvers> = {
    signIn: (_, input, { res }) => {
        return new UsersService().signIn(input, res)
    },
    signOut: (_, input, { res }) => {
        return new UsersService().signOut(res)
    },
    signUp: (_, input, { res }) => new UsersService().signup(input, res)
}

export default {
    queries,
    mutations
}
