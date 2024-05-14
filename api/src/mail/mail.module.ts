import { Module } from '@nestjs/common'
import { ClsModule } from 'nestjs-cls'
import { MailService } from './mail.service'
import { MailProcessor } from './mail.processor'
import { BullModule } from '@nestjs/bull'

@Module({
    imports: [
        ClsModule,
        BullModule.registerQueue({
            name: 'mail'
        })
    ],
    exports: [MailService],
    providers: [MailService, MailProcessor]
})
export class MailModule {}
