import { getDatabase, TMedium, TMeta } from '../database'
import sharp from 'sharp'
import { randomUUID } from 'crypto'
import fs from 'fs'
import { DeepPartial } from '../types'
import { Prisma } from '.prisma/client'

export default class MediaService {
    prisma = getDatabase()

    tableName = 'media'

    async truncate () {
        await this.prisma.medium.deleteMany({
            where: {}
        })
    }

    async createOne (medium: DeepPartial<TMedium> & { id?: string }) {
        await this.prisma.medium.findFirst({
            where: {
                hash: medium.hash
            }
        }).then(async (res) => {
            if (res) {
                await fs.unlinkSync(`./uploads/${medium.filenameDisk}`)
            }
            else {
                await this.prisma.medium.create({
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
                        meta: JSON.stringify(medium.meta)
                    }
                })
            }
        })
    }

    async createMany (media: (DeepPartial<TMedium> & { id?: string })[]) {
        const primaryKeys = media.map((medium) => this.createOne(medium))

        return await Promise.all(primaryKeys).then((results) => {
            return results
        })
    }

    async readOne (id: string) {
        const res = await this.prisma.medium.findFirst({
            where: {
                id
            },
            include: {
                owner: true,
                uploader: true
            }
        })

        if (res === null) {
            throw new Error()
        }

        return res as TMedium
    }

    async readOneFromDisk (filenameDisk: string) {
        return this.prisma.medium.findFirst({
            where: {
                filenameDisk
            },
            include: {
                owner: true,
                uploader: true
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

    readMany = async (conditions: Prisma.MediumWhereInput = {}, take = 100) => {
        return await this.prisma.medium.findMany({
            where: conditions,
            take,
            include: {
                owner: true,
                uploader: true
            }
        }) as TMedium[]
    }

    destroy = (keys: (string | null)[] | string) => {
        const keysToDestroy = (Array.isArray(keys) ? keys.filter((key) => key !== null) : [keys]) as string[]

        return this.readMany({
            id: {
                in: keysToDestroy
            }
        }).then((itemsToDestroy) => {
            itemsToDestroy.forEach((item) => {
                fs.unlinkSync(`./uploads/${item.filenameDisk}`)
            })

            return itemsToDestroy
        }).then(async (itemsToDestroy) => {
            await this.prisma.medium.deleteMany({
                where: {
                    id: {
                        in: itemsToDestroy.map((item) => item.id)
                    }
                }
            })

            return itemsToDestroy as TMedium[]
        })
    }

    rotate = (id: string) => {
        const newFileName = randomUUID()

        return this.readOne(id).then((medium) => {
            if (!medium) {
                throw new Error()
            }

            return sharp(`./uploads/${medium.filenameDisk}`).rotate(90).toFile(`./uploads/${newFileName}`).then((row) => {
                return this.update(id, {
                    meta: {
                        ...medium.meta as TMeta,
                        width: row.width,
                        height: row.height
                    },
                    filenameDisk: newFileName
                }).then((response) => {
                    fs.unlinkSync(`./uploads/${medium.filenameDisk}`)
                    return response
                })
            })
        })
    }

    updateMany = (ids: string[], newProps: Partial<TMedium>) => {
        delete newProps.id

        const props = newProps as Partial<TMedium> & { meta: string }

        if (props.meta) {
            props.meta = JSON.stringify(props.meta)
        }

        return this.prisma.medium.updateMany({
            where: {
                id: {
                    in: ids
                }
            },
            data: {
                ...props
            }
        })
    }

    update = async (id: string, newProps: Partial<TMedium>) => {
        delete newProps.id

        const data = newProps as Partial<TMedium> & { meta: string, owner: { connect: { id?: string } }, uploader: { connect: { id?: string } } }

        if (data.meta) {
            data.meta = JSON.stringify(data.meta)
        }

        if (data.owner) {
            data.owner = {
                connect: {
                    id: data.owner.id
                }
            }
        }

        if (data.uploader) {
            data.uploader = {
                connect: {
                    id: data.uploader.id
                }
            }
        }

        return await this.prisma.medium.update({
            where: {
                id
            },
            data,
            include: {
                owner: true,
                uploader: true
            }
        }) as TMedium
    }
}
