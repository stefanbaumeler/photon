import { getDatabase, TMedium } from '../database'
import sharp from 'sharp'
import { randomUUID } from 'crypto'
import fs from 'fs'
import { DeepPartial } from '../types'
import { Prisma } from '.prisma/client'
import Enumerable = Prisma.Enumerable
import MediumOrderByWithRelationInput = Prisma.MediumOrderByWithRelationInput
import { fileToMedium } from '../helpers/exif'
import { FileUpload } from 'graphql-upload-minimal'
import { getCV } from '../../drivers'
import path from 'path'
import { getEnv } from '../../env'

const env = getEnv()

export default class MediaService {
    prisma = getDatabase()

    context

    constructor (context?: { user: { id: string } }) {
        this.context = context
    }

    truncate = async () => {
        await this.prisma.medium.deleteMany()

        this.prisma.albumMedium.deleteMany()
    }

    createOne = async (medium: DeepPartial<TMedium> & { id?: string }) => {
        const existing = await this.prisma.medium.findFirst({
            where: {
                OR: {
                    hash: medium.hash,
                    id: medium.id
                }
            }
        }) as TMedium | null

        if (existing) {
            const existingPath = path.join(__dirname, '../../', env.API_UPLOADS_DIR, existing.filenameDisk)
            if (fs.existsSync(existingPath)) {
                await fs.unlinkSync(path.join(__dirname, '../../', env.API_UPLOADS_DIR, existing.filenameDisk))
            }

            return existing
        }

        return await this.prisma.medium.create({
            data: {
                ...medium as DeepPartial<TMedium>,
                owner: {
                    connect: {
                        id: medium.owner?.id
                    }
                },
                uploader: {
                    connect: {
                        id: medium.uploader?.id
                    }
                },
                meta: JSON.stringify(medium.meta),
                favoredBy: {
                    connect: medium.favoredBy?.map((fav) => ({
                        id: fav?.id
                    }))
                }
            }

        }) as TMedium
    }

    createMany = async (media: (DeepPartial<TMedium> & { id?: string })[]) => {
        const promises = media.map((medium) => {
            return this.createOne(medium)
        })

        return Promise.all(promises).then((results) => {
            return results.filter((result) => result !== undefined) as TMedium[]
        })
    }

    writeToDisk = async (filePromises: Promise<FileUpload>[]) => {
        const promises = filePromises.map(async (filePromise) => {
            const name = randomUUID()
            const pathName = `${process.env.API_UPLOADS_DIR}/${name}`
            const file = await filePromise
            const stream = file.createReadStream()

            return await new Promise<Promise<TMedium>>((resolve) => {
                stream.pipe(fs.createWriteStream(pathName)).on('finish', () => {
                    this.generateTags(pathName, name)

                    if (!this.context?.user.id) {
                        return {} as DeepPartial<TMedium>
                    }

                    const m = fileToMedium({
                        filePath: pathName,
                        fileName: name,
                        originalName: file.filename,
                        type: file.mimetype,
                        user: this.context.user.id
                    }) as Promise<TMedium>

                    resolve(m)
                })
            }) as TMedium
        })

        return await Promise.all(promises) as TMedium[]
    }

    generateTags = async (pathName: string, filenameDisk: string) => {
        if (!process.env.CV_REKOGNITION_ACCESS_KEY_ID || !process.env.CV_REKOGNITION_SECRET_ACCESS_KEY || !process.env.CV_REKOGNITION_REGION) {
            return false
        }

        const buffer = await fs.promises.readFile(pathName)

        const recognize = await getCV()
        const labels = await recognize.labels(buffer)

        if (labels) {
            await this.writeGeneratedTags(labels, filenameDisk)
        }
    }

    writeGeneratedTags = async (tags: string[], filenameDisk: string) => {
        const medium = await this.readOneFromDisk(filenameDisk)

        if (!medium) {
            return
        }

        await this.prisma.medium.update({
            where: {
                id: medium.id
            },
            data: {
                generatedTags: tags.join(', ')
            }
        })
    }

    async readOne (id: string) {
        const medium = await this.prisma.medium.findFirst({
            where: {
                id
            },
            include: {
                owner: true,
                uploader: true,
                favoredBy: {
                    where: {
                        id: this.context?.user.id
                    },
                    include: {
                        favorites: {
                            where: {
                                id: this.context?.user.id
                            }
                        }
                    }
                }
            }
        })

        return medium as TMedium
    }

    async readOneFromDisk (filenameDisk: string) {
        return this.prisma.medium.findFirst({
            where: {
                filenameDisk
            },
            include: {
                owner: true,
                uploader: true,
                favoredBy: {
                    where: {
                        id: this.context?.user.id
                    }
                }
            }
        })
    }

    countByYear = async (conditions: Prisma.MediumWhereInput = {}) => {
        const [{ _count: count }, dateSets] = await this.prisma.$transaction([
            this.prisma.medium.aggregate({
                _count: true
            }),
            this.prisma.medium.findMany({
                where: conditions,
                select: {
                    dateTaken: true,
                    dateCreated: true
                }
            })
        ])

        const years: { count: number, year: number, months: { month: number, count: number }[]}[] = []

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
                }
                else {
                    existingYear.months.push({
                        month,
                        count: 1
                    })
                }
            }
            else {
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

    readMany = async ({
        conditions, orderBy, take = 100
    }: { conditions?: Prisma.MediumWhereInput, orderBy?: Enumerable<MediumOrderByWithRelationInput>, take?: number } = {}) => {
        return await this.prisma.medium.findMany({
            where: conditions,
            orderBy,
            take,
            include: {
                owner: true,
                uploader: true,
                favoredBy: {
                    where: {
                        id: this.context?.user.id
                    }
                }
            }
        }) as TMedium[]
    }

    destroy = async (ids: string[] | string) => {
        const idsToDestroy = Array.isArray(ids) ? ids : [ids]

        const media = await this.readMany({
            conditions: {
                id: {
                    in: idsToDestroy
                }
            }
        })

        media.forEach((medium) => {
            fs.unlinkSync(path.join(__dirname, '../../', env.API_UPLOADS_DIR, medium.filenameDisk))
        })

        await this.prisma.medium.deleteMany({
            where: {
                id: {
                    in: idsToDestroy
                }
            }
        })

        return media
    }

    rotate = async (id: string) => {
        const medium = await this.readOne(id)

        const filePath = path.join(__dirname, '../../', env.API_UPLOADS_DIR, medium.filenameDisk)
        const filePathOld = path.join(__dirname, '../../', env.API_UPLOADS_DIR, `old_${medium.filenameDisk}`)
        await fs.renameSync(filePath, filePathOld)

        const row = await sharp(filePathOld).rotate(90).toFile(filePath)

        const meta = JSON.stringify({
            ...JSON.parse(medium.meta as string),
            width: row.width,
            height: row.height
        })

        const response = await this.prisma.medium.update({
            where: {
                id
            },
            data: {
                meta
            }
        })

        fs.unlinkSync(filePathOld)

        return response as TMedium
    }

    setStatus = (ids: string[], status: string) => {
        return this.prisma.medium.updateMany({
            where: {
                id: {
                    in: ids
                }
            },
            data: {
                status
            }
        })
    }
}
