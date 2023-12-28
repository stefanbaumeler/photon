export type JwtPayload = {
    id: string
}

export type JwtPayloadWithRefreshToken = JwtPayload & {
    refreshToken?: string
}
