import { Inject, Injectable } from '@nestjs/common'
import { IdsDto } from '../shared/dto'
import { ClsService } from 'nestjs-cls'
import * as schema from '../drizzle/schema'
import { DrizzleAsyncProvider } from '../drizzle/drizzle.provider'
import { NodePgDatabase } from 'drizzle-orm/node-postgres'
import { favorite } from '../drizzle/schema'
import { and, eq, inArray } from 'drizzle-orm'
@Injectable()
export class FavoriteRepository {
    constructor (private cls: ClsService, @Inject(DrizzleAsyncProvider) private db: NodePgDatabase<typeof schema>) { }

    async insertMany (dto: IdsDto) {
        await this.db.insert(favorite).values(dto.ids.map((id) => ({
            idUser: this.cls.get('userId'),
            idMedium: id
        })))

        return true
    }

    async deleteMany (dto: IdsDto) {
        await this.db.delete(favorite).where(and(eq(favorite.idUser, this.cls.get('userId')), inArray(favorite.idMedium, dto.ids)))

        return true
    }
}
