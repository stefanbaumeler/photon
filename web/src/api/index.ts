import { Client, cacheExchange, fetchExchange } from 'urql'
import { devtoolsExchange } from '@urql/devtools'
import { AuthConfig, authExchange } from '@urql/exchange-auth'

const initializeAuthState = async () => {
    if (typeof window === 'undefined') {
        return {
            accessToken: '',
            refreshToken: ''
        }
    }
    const cache = JSON.parse(window.localStorage.getItem('photon'))

    if (!cache || !cache.accessToken) {
        if (window.location.pathname !== '/login') {
            window.location.href = '/login'
        }
        return {
            accessToken: '',
            refreshToken: ''
        }
    }

    return {
        accessToken: cache.accessToken,
        refreshToken: cache.refreshToken
    }
}

export const initializeUrqlClient = () => new Client({
    url: process.env.NEXT_PUBLIC_API_URL,
    fetchOptions: {
        credentials: process.env.NEXT_PUBLIC_API_CREDENTIALS === '0' ? 'omit' : 'include'
    },
    exchanges: [devtoolsExchange, cacheExchange, authExchange(async (utils) => {
        if (process.env.NEXT_PUBLIC_API_CREDENTIALS === '0') {
            return
        }

        const {
            accessToken, refreshToken
        } = await initializeAuthState()

        if (!accessToken && !refreshToken) {
            return
        }

        return {
            addAuthToOperation: (operation) => {
                if (!accessToken) {
                    return operation
                }

                return utils.appendHeaders(operation, {
                    Authorization: `Bearer ${accessToken}`
                })
            },
            didAuthError: (error) => {
                return error.graphQLErrors.some((e) => e.extensions?.code === 'FORBIDDEN')
            },
            refreshAuth: async () => {
            }
        } as AuthConfig
    }), fetchExchange]
})
