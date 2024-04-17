import { Module } from '@nestjs/common'
import { PrismaModule } from '../prisma/prisma.module'
import { ClsModule } from 'nestjs-cls'
import { MailService } from './mail.service'
import { MailProcessor } from './mail.processor'
import { BullModule } from '@nestjs/bull'

@Module({
    imports: [
        PrismaModule,
        ClsModule,
        BullModule.registerQueue({
            name: 'mail'
        })
    ],
    exports: [MailService],
    providers: [MailService, MailProcessor]
})
export class MailModule {}
