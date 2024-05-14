export const setDbUrl = () => {
    process.env.DB_URL = `postgresql://${process.env.DB_USER}:postgres@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}?schema=public`
}
