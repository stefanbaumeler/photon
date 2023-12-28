import { NestFactory } from '@nestjs/core'
import { AppModule } from './app/app.module'
import cookieParser from 'cookie-parser'

async function bootstrap () {
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
