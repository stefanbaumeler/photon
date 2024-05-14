import { Inject, Injectable } from '@nestjs/common'
import { ClsService } from 'nestjs-cls'
import { DrizzleAsyncProvider } from '../drizzle/drizzle.provider'
import { NodePgDatabase } from 'drizzle-orm/node-postgres'
import * as schema from '../drizzle/schema'
import { tag, mediumToTag } from '../drizzle/schema'
import { TagsInsertDto } from './tag.dto'
import { notInArray } from 'drizzle-orm'
import fs from 'fs'
import { getEnv } from '../../env'
import sharp from 'sharp'
import { getCV } from '../../drivers'
import { Medium } from '../medium/medium.model'
import path from 'path'

const env = getEnv()

@Injectable()
export class TagRepository {
    constructor(private cls: ClsService, @Inject(DrizzleAsyncProvider) private db: NodePgDatabase<typeof schema>) { }

    async insert(dto: TagsInsertDto) {
        const tags = ['']
        const res = await this.db.insert(tag).values(tags.map((tag) => ({
            label: tag,
            idUser: dto.idUser,
            source: dto.source
        }))).onConflictDoNothing({
            target: [tag.label, tag.idUser],
        }).returning({
            id: tag.id
        })

        await this.db.insert(mediumToTag).values(res.map((insertedTag) => ({
            idMedium: dto.idMedium,
            idTag: insertedTag.id
        })))

        return res;
    }

    async deleteUnused() {
        const usedTags = this.db.select({
            id: mediumToTag.idTag
        }).from(mediumToTag)

        await this.db.delete(tag).where(notInArray(tag.id, usedTags))
    }

    async generate(medium: Pick<Medium, 'filenameDisk'>) {
        if (!env.CV_REKOGNITION_ACCESS_KEY_ID || !env.CV_REKOGNITION_SECRET_ACCESS_KEY || !env.CV_REKOGNITION_REGION) {
            return []
        }

        const buffer = await fs.promises.readFile(path.join(__dirname, '../../../', env.API_UPLOADS_DIR, medium.filenameDisk))

        const bufferForCV = await this.reduceToFileSize(buffer, 4.9)

        const recognize = await getCV()
        const labels = await recognize.labels(bufferForCV)
        const text = await recognize.text(bufferForCV)
        // const faces = await recognize.faces(bufferForCV)

        return [...labels, ...text]
    }

    private async reduceToFileSize(buffer: Buffer, sizeInMB: number, quality = 80, attempts = 10): Promise<Buffer> {
        const newFile = await sharp(buffer).jpeg({
            quality
        }).toBuffer()

        if (newFile.byteLength / 1000 / 1000 < sizeInMB) {
            return newFile
        }

        if (attempts) {
            return await this.reduceToFileSize(buffer, sizeInMB, quality - 5, attempts - 1)
        }

        return newFile
    }
}
