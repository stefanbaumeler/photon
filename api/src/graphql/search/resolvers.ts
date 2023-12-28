export {}
// import { TMutationResolvers, TQueryResolvers } from '@photon/schema'
// import { v2 } from '@google-cloud/translate'
// import { getEnv } from '../../../env'
//
// const env = getEnv()
// const queries: Partial<TQueryResolvers> = {
//     translate: async (_, { query }) => {
//         const translate = new v2.Translate({
//             key: env.GCC_TRANSLATE_KEY
//         })
//         const [translated] = await translate.translate(query, {
//             to: 'en',
//             from: 'de'
//         })
//
//         return translated
//     }
// }
//
// const mutations: Partial<TMutationResolvers> = {}
//
// export default {
//     queries,
//     mutations
// }
