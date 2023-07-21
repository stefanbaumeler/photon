import UsersService from '../../services/users'
import { TQueryResolvers, TMutationResolvers } from '@photon/schema'

const queries: Partial<TQueryResolvers> = {
    users: (_, input, context) =>  new UsersService(context).readMany(),
    user: (_, input, context) => new UsersService(context).readOne(input.id),
    profile: (_, input, context) => new UsersService(context).readOne(context.user.id)
}

const mutations: Partial<TMutationResolvers> = {
    signIn: (_, input, context) => {
        return new UsersService(context).signIn(input)
    },
    signOut: (_, input, context) => {
        return new UsersService(context).signOut()
    },
    signUp: (_, input, context) => new UsersService(context).signUp(input),
    changeLanguage: (_, { language }, context) => {
        console.log(context, 'changing')
        return new UsersService(context).changeLanguage(language)
    }
}

export default {
    queries,
    mutations
}
