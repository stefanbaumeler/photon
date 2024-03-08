import { Client, fetchExchange, cacheExchange } from 'urql'
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
    exchanges: [devtoolsExchange, authExchange(async (utils) => {
        if (process.env.NEXT_PUBLIC_API_CREDENTIALS === '0') {
            return {
                addAuthToOperation: (operation) => operation
            } as AuthConfig
        }

        const {
            accessToken, refreshToken
        } = await initializeAuthState()

        if (!accessToken && !refreshToken) {
            return {
                addAuthToOperation: (operation) => operation
            } as AuthConfig
        }

        return {
            addAuthToOperation: (operation) => {
                if (!accessToken) {
                    return operation
                }

                return utils.appendHeaders(operation, {
                    authorization: `Bearer ${accessToken}`
                })
            },
            didAuthError: (error) => {
                return error.graphQLErrors.some((e) => e.extensions?.code === 'FORBIDDEN')
            },
            refreshAuth: async () => {
            }
        } as AuthConfig
    }), cacheExchange, fetchExchange]
})
