import { TQueryResolvers, TMutationResolvers } from '../../database'
import DevicesService from '../../services/devices'

const queries: Partial<TQueryResolvers> = {
    devices: (_, input, context) => new DevicesService(context).readMany()
}

const mutations: Partial<TMutationResolvers> = {
    register: (_, input, context) => new DevicesService(context).register(input.device)
}

export default {
    queries,
    mutations
}
