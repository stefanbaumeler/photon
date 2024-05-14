import { Inject, Injectable } from '@nestjs/common'
import { IdDto } from '../shared/dto'
import { DrizzleAsyncProvider } from '../drizzle/drizzle.provider'
import { NodePgDatabase } from 'drizzle-orm/node-postgres'
import * as schema from '../drizzle/schema'
import { device, userToDevice } from '../drizzle/schema'
import { eq } from 'drizzle-orm'
import { ClsService } from 'nestjs-cls'
@Injectable()
export class DeviceRepository {
    constructor(private cls: ClsService, @Inject(DrizzleAsyncProvider) private db: NodePgDatabase<typeof schema>) { }

    async findByUser(dto: IdDto) {
        const devices = this.db.select().from(userToDevice).where(eq(userToDevice.idUser, this.cls.get('userId'))).as('devices')
        return this.db.with(devices).select().from(device)
    }
}
