import dotenv from 'dotenv'
import path from 'path'

type TAppEnv = { [key: string]: string | undefined } & {
    NODE_ENV: string
    NEXT_PUBLIC_API_URL: string
    NEXT_PUBLIC_UPLOADS_URL: string
    DATABASE_URL: string
    NEXT_PUBLIC_TYPESENSE_HOST: string
    NEXT_PUBLIC_TYPESENSE_PORT: string
    NEXT_PUBLIC_TYPESENSE_SECURE: string
    NEXT_PUBLIC_TYPESENSE_SEARCH_KEY: string
    NEXT_PUBLIC_MAPBOX_KEY: string
}

export const getEnv = () => {
    console.log(path.join(__dirname, `.env${process.env.NODE_ENV ? `.${process.env.NODE_ENV}` : ''}`))
    dotenv.config({
        path: path.join(__dirname, `.env${process.env.NODE_ENV ? `.${process.env.NODE_ENV}` : ''}`),
        override: true
    })

    return process.env as TAppEnv
}
