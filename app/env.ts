import dotenv from 'dotenv'
import path from 'path'

type TAppEnv = { [key: string]: string | undefined } & {
    NODE_ENV: string
    NEXT_PUBLIC_API_URL: string
    NEXT_PUBLIC_UPLOADS_DIR: string
    DATABASE_URL: string
}

export const getEnv = () => {
    dotenv.config({
        path: path.join(__dirname, `.env${process.env.NODE_ENV ? `.${process.env.NODE_ENV}` : ''}`),
        override: true
    })

    return process.env as TAppEnv
}
