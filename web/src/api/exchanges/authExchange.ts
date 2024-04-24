import { AuthConfig, authExchange as baseAuthExchange } from '@urql/exchange-auth'
import jwt from 'jsonwebtoken'
import { MRefreshAccessTokenDocument } from '@photon/schema/dist/server'

export const initializeAuthState = () => {
    if (typeof window === 'undefined') {
        return {
            accessToken: '',
            refreshToken: ''
        }
    }

    const cache = JSON.parse(window.localStorage.getItem('photon') ?? '{}')

    if (!cache || !cache.accessToken) {
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

export const authExchange = baseAuthExchange(async (utils) => {
    if (process.env.NEXT_PUBLIC_API_CREDENTIALS === '0') {
        return {
            addAuthToOperation: (operation) => operation
        } as AuthConfig
    }

    const {
        accessToken,
        refreshToken
    } = initializeAuthState()

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
            return error.graphQLErrors.some((e) => e.extensions?.code === 'UNAUTHENTICATED')
        },
        willAuthError () {
            const token = jwt.decode(accessToken) as jwt.JwtPayload
            return Date.now() >= (token.exp ?? 0) * 1000
        },
        refreshAuth: async () => {
            const newAccess = await utils.mutate(MRefreshAccessTokenDocument, {
                refreshToken,
                accessToken
            })

            if (newAccess.data) {
                localStorage.photon = JSON.stringify({
                    accessToken: newAccess.data.refreshAccessToken.accessToken,
                    refreshToken: newAccess.data.refreshAccessToken.refreshToken
                })
                window.location.reload()
            } else {
                delete localStorage.photon

                if (window.location.pathname !== '/') {
                    window.location.href = '/'
                }
            }
        }
    } as AuthConfig
})
