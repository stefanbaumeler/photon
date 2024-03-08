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

const providers: Provider[] = [AppService]

if (process.env.NODE_ENV !== 'test') {
    providers.push({
        provide: APP_GUARD,
        useClass: AccessTokenGuard
    })
}

@Module({
    imports: [
        ClsModule.forRoot({
            middleware: {
                // automatically mount the
                // ClsMiddleware for all routes
                mount: true,
                // and use the setup method to
                // provide default store values.
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
            // cors: {
            //     origin: true,
            //     methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
            //     credentials: true
            // },
            driver: ApolloDriver,
            autoSchemaFile: './schema.gql',
            playground: {
                settings: {
                    'request.credentials': 'include'
                }
            }
        }),
        UserModule,
        AlbumModule,
        MediumModule,
        FavoriteModule,
        UploadModule,
        DeviceModule
    ],
    controllers: [AppController],
    providers
})
export class AppModule {
}

