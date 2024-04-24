import { devtoolsExchange } from '@urql/devtools'
import { authExchange } from '@/api/exchanges/authExchange'
import { fetchExchange, cacheExchange, ssrExchange } from '@urql/core'
import { registerUrql } from '@urql/next/rsc'
import { createClient } from '@urql/next'

if (!process.env.NEXT_PUBLIC_API_URL) {
    throw new Error('Cannot create urql client: NEXT_PUBLIC_API_URL is not defined in the env variables.')
}

export const urqlSsrExchange = ssrExchange({
    isClient: typeof window !== 'undefined'
})

export const urqlClient = createClient({
    url: process.env.NEXT_PUBLIC_API_URL ?? '',
    fetchOptions: {
        credentials: process.env.NEXT_PUBLIC_API_CREDENTIALS === '0' ? 'omit' : 'include',
        headers: {
            'Apollo-Require-Preflight': 'true'
        }
    },
    suspense: true,
    exchanges: [authExchange, cacheExchange, devtoolsExchange, urqlSsrExchange, fetchExchange]
})

const { getClient } = registerUrql(() => urqlClient)

export const getUrqlClient = getClient
