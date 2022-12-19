import UsersService from '../../services/users'
import { TQueryResolvers, TMutationResolvers } from '../../database'

const queries: Partial<TQueryResolvers> = {
    users: () =>  new UsersService().readMany(),
    user: (_, input) => new UsersService().readOne(input.id)
}

const mutations: Partial<TMutationResolvers> = {
    signIn: (_, input, {
        res, req
    }) => {
        return new UsersService().signIn(input, res, req)
    },
    signOut: (_, input, { res }) => {
        return new UsersService().signOut(res)
    },
    signUp: (_, input, {
        res, req
    }) => new UsersService().signUp(input, res, req)
}

export default {
    queries,
    mutations
}
