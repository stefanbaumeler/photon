import { Injectable } from '@nestjs/common'
import { MediumRepository } from './medium.repository'
import { MediumFilenameDiskDto,
    MediumFilterDto,
    MediumRotateDto,
    MediumUpdateDto,
    MediumUpdateManyDto } from './medium.dto'
import fs from 'fs'
import path from 'path'
import { getEnv } from '../../env'
import { randomUUID } from 'crypto'
import AdmZip from 'adm-zip'
import sharp from 'sharp'
import { TMeta } from '@photon/schema'
import { IdDto, IdsDto } from '../shared/dto'
import { Prisma } from '@prisma/client'
import GeocodingClient from '@mapbox/mapbox-sdk/services/geocoding'
import { v2 } from '@google-cloud/translate'
import { ClsService } from 'nestjs-cls'

const env = getEnv()

@Injectable()
export class MediumService {
    constructor (private repository: MediumRepository, private cls: ClsService) {}

    async getAll (dto?: MediumFilterDto) {
        const userId = this.cls.get('userId')

        const conditions: Prisma.MediumWhereInput = {
            owner: {
                id: userId
            }
        }

        if (dto) {
            if (dto.favorites) {
                conditions.favoredBy = {
                    some: {
                        id: userId
                    }
                }
            }

            if (dto.status) {
                conditions.status = dto.status
            }

            if (dto.q) {
                const translate = new v2.Translate({
                    key: env.GCC_TRANSLATE_KEY
                })
                const [translated] = await translate.translate(dto.q, {
                    to: 'en',
                    from: 'de'
                })

                conditions.AND = translated.split(' ').filter((s) => s !== '').map((word) => {
                    return {
                        tags: {
                            some: {
                                label: {
                                    mode: 'insensitive',
                                    search: word
                                }
                            }
                        }
                    }
                })
            }

            if (dto.album) {
                return await this.repository.findByAlbum({
                    id: dto.album
                }, conditions, this.includeAll())
            }

            if (dto.ids) {
                conditions.id = {
                    in: dto.ids
                }
            }
        }

        return this.repository.findMany(conditions,  this.includeAll())
    }

    private includeAll () {
        return {
            owner: true,
            uploader: true,
            tags: true,
            favoredBy: {
                where: {
                    id: this.cls.get('userId')
                }
            }
        }
    }

    async getById (dto: IdDto) {
        return this.repository.findById(dto, this.includeAll())
    }

    async getByFilenameDisk (dto: MediumFilenameDiskDto) {
        return this.repository.findOneByFilenameDisk(dto, this.includeAll())
    }

    async getArchive () {
        return this.repository.findByStatus({
            status: 'archive'
        }, this.includeAll())
    }

    async getTrash () {
        return this.repository.findByStatus({
            status: 'trash'
        },
        this.includeAll())
    }

    async update (dto: MediumUpdateDto) {
        return this.repository.update(dto, this.includeAll())
    }

    async updateMany (dto: MediumUpdateManyDto) {
        return this.repository.updateMany(dto)
    }

    async emptyTrash () {
        const media = await this.getTrash()

        media.forEach((medium) => {
            fs.unlinkSync(path.join(__dirname, '../../../', env.API_UPLOADS_DIR, medium.filenameDisk))
        })

        await this.repository.deleteMany({
            ids: media.map((medium) => medium.id)
        })

        return media
    }

    async delete (dto: IdsDto) {
        const media = await this.repository.findMany({
            id: {
                in: dto.ids
            }
        })

        media.forEach((medium) => {
            fs.unlinkSync(path.join(__dirname, '../../../', env.API_UPLOADS_DIR, medium.filenameDisk))
        })

        await this.repository.deleteMany(dto)

        return media
    }

    async rotate (dto: MediumRotateDto) {
        const medium = await this.repository.findById(dto)

        if (!medium) {
            return
        }

        const filePath = path.join(__dirname, '../../../', env.API_UPLOADS_DIR, medium.filenameDisk)
        const filePathOld = path.join(__dirname, '../../../', env.API_UPLOADS_DIR, `old_${medium.filenameDisk}`)
        fs.renameSync(filePath, filePathOld)
        const row = await sharp(filePathOld).rotate(dto.deg).toFile(filePath)

        const meta = {
            ...medium.meta as TMeta,
            width: row.width,
            height: row.height
        }

        const update = await this.update({
            id: medium.id,
            meta
        })

        fs.unlinkSync(filePathOld)

        return update
    }

    async download (dto: IdsDto) {
        const media = await this.repository.findMany({
            id: {
                in: dto.ids
            }
        })

        if (media.length === 1) {
            return {
                url: `/uploads/${media[0].filenameDisk}?download=1`
            }
        }

        const downloadId = randomUUID()
        const zip = new AdmZip()

        media.forEach((medium) => {
            zip.addLocalFile(path.join(__dirname, '../../../', env.API_UPLOADS_DIR, medium.filenameDisk), '', medium.filenameDownload || medium.filenameDisk)
        })

        if (!fs.existsSync('downloads')) {
            fs.mkdirSync('downloads')
        }

        zip.writeZip(path.join(__dirname, '../../../', 'downloads', `${downloadId}.zip`))

        return {
            url: `/downloads/${downloadId}.zip`
        }
    }

    async countByYear () {
        const {
            count, dateSets
        } = await this.repository.count()

        const years: { count: number, year: number, months: { month: number, count: number }[] }[] = []

        dateSets.forEach((dateSet) => {
            const date = new Date(dateSet.dateTaken ?? dateSet.dateCreated)

            const year = date.getFullYear()
            const month = date.getMonth()

            const existingYear = years.find((y) => y.year === year)

            if (existingYear) {
                existingYear.count++
                const existingMonth = existingYear.months.find((m) => m.month === month)

                if (existingMonth) {
                    existingMonth.count++
                } else {
                    existingYear.months.push({
                        month,
                        count: 1
                    })
                }
            } else {
                years.push({
                    year,
                    count: 1,
                    months: [
                        {
                            month,
                            count: 1
                        }
                    ]
                })
            }
        })

        years.forEach((year) => {
            year.months = year.months.sort((a, b) => b.month - a.month)
        })

        return {
            count,
            years: years.sort((a, b) => b.year - a.year)
        }
    }
}
