import { Module, Provider } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { MediumModule } from '../medium/medium.module'
import { GraphQLModule } from '@nestjs/graphql'
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { UserModule } from '../user/user.module'
import { AlbumModule } from '../album/album.module'
import { FavoriteModule } from '../favorite/favorite.module'
import { APP_GUARD } from '@nestjs/core'
import { AccessTokenGuard } from '../auth/guards/accessToken.guard'
import { ConfigModule } from '@nestjs/config'
import { Request, Response } from 'express'
import { UploadModule } from '../upload/upload.module'
import { ClsModule } from 'nestjs-cls'
import jwt from 'jsonwebtoken'
import { predefinedUserUUIDs } from '../database/helpers/ids'
import { DeviceModule } from '../device/device.module'
import { DownloadsModule } from '../downloads/downloads.module'
import { MailModule } from '../mail/mail.module'
import { BullModule } from '@nestjs/bull'
import { getEnv } from '../../env'
import { CookieResolver, I18nModule, QueryResolver } from 'nestjs-i18n'
import path from 'path'

const providers: Provider[] = [AppService]

if (process.env.NODE_ENV !== 'test') {
    providers.push({
        provide: APP_GUARD,
        useClass: AccessTokenGuard
    })
}

const env = getEnv()

@Module({
    imports: [
        ClsModule.forRoot({
            middleware: {
                mount: true,
                setup: (cls, req) => {
                    const user = process.env.NODE_ENV === 'test' ? {
                        id: predefinedUserUUIDs[0]
                    } : jwt.decode(req.cookies.accessToken) as { id: string }
                    cls.set('userId', user?.id || '')
                }
            }
        }),
        ConfigModule.forRoot({
            isGlobal: true
        }),
        GraphQLModule.forRoot<ApolloDriverConfig>({
            context: ({
                req, res
            }: { req: Request, res: Response }) => {
                return {
                    req,
                    res
                }
            },
            driver: ApolloDriver,
            autoSchemaFile: './schema.gql',
            playground: {
                settings: {
                    'request.credentials': 'include'
                }
            }
        }),
        MailModule,
        UserModule,
        AlbumModule,
        MediumModule,
        FavoriteModule,
        UploadModule,
        DownloadsModule,
        DeviceModule,
        BullModule.forRoot({
            redis: {
                host: env.REDIS_HOST,
                port: parseInt(env.REDIS_PORT ?? '')
            }
        }),
        I18nModule.forRoot({
            fallbackLanguage: 'en',
            loaderOptions: {
                path: path.join(__dirname, '../../../src/translations/'),
                watch: true
            },
            typesOutputPath: path.join(__dirname, '../../../src/types/generated/i18n.ts'),
            resolvers: [
                {
                    use: QueryResolver,
                    options: ['lang']
                },
                CookieResolver
            ]
        })
    ],
    controllers: [AppController],
    providers
})
export class AppModule {
}

