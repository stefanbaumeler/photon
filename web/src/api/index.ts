import { Client, cacheExchange, fetchExchange } from 'urql'
import { devtoolsExchange } from '@urql/devtools'

export const urql = new Client({
    url: process.env.NEXT_PUBLIC_API_URL,
    exchanges: [devtoolsExchange, cacheExchange, fetchExchange]
})
