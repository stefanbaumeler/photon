import { Inject, Injectable } from '@nestjs/common'
import { UserLanguageDto, UserSignUpDto } from './user.dto'
import { ClsService } from 'nestjs-cls'
import { IdDto } from '../shared/dto'
import { DrizzleAsyncProvider } from '../drizzle/drizzle.provider'
import { NodePgDatabase } from 'drizzle-orm/node-postgres'
import * as schema from '../drizzle/schema'
import { user } from '../drizzle/schema'
import { eq, getTableColumns } from 'drizzle-orm'

@Injectable()
export class UserRepository {
    constructor (private cls: ClsService, @Inject(DrizzleAsyncProvider) private db: NodePgDatabase<typeof schema>) { }

    columns = getTableColumns(user)

    async profile (dto?: IdDto) {
        const res = await this.db.select().from(user).where(eq(user.id, dto?.id ?? this.cls.get('userId')))
        return res[0]
    }

    async findByMail (mail: string) {
        const res = await this.db.select().from(user).where(eq(user.email, mail))

        return res[0]
    }

    async signUp (dto: UserSignUpDto & { signUpToken: string }) {
        const res = await this.db.insert(user).values(dto).returning(this.columns)

        return res[0]
    }

    async changeLanguage (dto: UserLanguageDto) {
        return this.db.update(user).set({
            language: dto.language
        }).where(eq(user.id, this.cls.get('userId'))).returning(this.columns)
    }

    async changePassword (newPassword: string) {
        return this.db.update(user).set({
            password: newPassword
        }).where(eq(user.id, this.cls.get('userId'))).returning(this.columns)
    }

    async resetSignUpToken (dto: IdDto) {
        await this.db.update(user).set({
            signUpToken: null
        }).where(eq(user.id, dto.id)).returning(this.columns)
    }
}
