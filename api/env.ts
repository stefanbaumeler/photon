import dotenv from 'dotenv'
import path from 'path'

type TApiEnv = { [key: string]: string | undefined } & {
    NODE_ENV: string
    DB_DATABASE: string
    DB_USER: string
    DB_HOST: string
    DB_PORT: string
    JWT_SECRET: string
    API_HOST: string
    API_PORT: string
    API_SECURE: string
    API_UPLOADS_DIR: string
    CV_DRIVER?: string
    CV_REKOGNITION_ACCESS_KEY_ID?: string
    CV_REKOGNITION_SECRET_ACCESS_KEY?: string
    CV_REKOGNITION_REGION?: string
    TYPESENSE_HOST: string
    TYPESENSE_PORT: string
    TYPESENSE_SECURE: string
    TYPESENSE_ADMIN_KEY: string
}

export const getEnv = () => {
    dotenv.config({
        path: path.join(__dirname, `.env${process.env.NODE_ENV ? `.${process.env.NODE_ENV}` : ''}`),
        override: true
    })

    return process.env as TApiEnv
}
