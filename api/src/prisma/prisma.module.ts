import { Module } from '@nestjs/common'
import { PrismaService } from './prisma.service'
import { ClsModule } from 'nestjs-cls'

@Module({
    imports: [ClsModule],
    providers: [PrismaService],
    exports: [PrismaService]
})
export class PrismaModule {}
