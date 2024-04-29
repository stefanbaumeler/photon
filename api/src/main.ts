import 'dotenv/config'
import { client, db } from './drizzle/db'
import { resolve } from 'node:path'
import { migrate } from 'drizzle-orm/node-postgres/migrator'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app/app.module'
import cookieParser from 'cookie-parser'

async function bootstrap () {
    await client.connect()
    await migrate(db, {
        migrationsFolder: resolve(__dirname, '../../src/drizzle')
    })

    const app = await NestFactory.create(AppModule)
    app.use(cookieParser())
    app.enableCors({
        origin: true,
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
        credentials: true
    })
    await app.listen(11011)
}
bootstrap()
