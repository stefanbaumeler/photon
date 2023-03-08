import { getDatabase } from '../database'
import { TMedium } from '@photon/schema'
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
import AdmZip from 'adm-zip'
import { getTypesense } from '../search'
// import GeocodingClient from '@mapbox/mapbox-sdk/services/geocoding'

const env = getEnv()

export default class MediaService {
    prisma = getDatabase()

    typesense = getTypesense()

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

        if (existing && medium.filenameDisk) {
            const existingPath = path.join(__dirname, '../../', env.API_UPLOADS_DIR, medium.filenameDisk)

            if (fs.existsSync(existingPath)) {
                await fs.unlinkSync(path.join(__dirname, '../../', env.API_UPLOADS_DIR, medium.filenameDisk))
            }

            return existing
        }

        const locationData = medium.location && medium.location[0] && medium.location[1]
            ? await this.getLocationData([medium.location[0], medium.location[1]])
            : {}

        return await this.prisma.medium.create({
            data: {
                ...medium as DeepPartial<TMedium>,
                ...locationData,
                generatedTags: medium.generatedTags?.join(', '),
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
                meta: medium.meta as string,
                favoredBy: {
                    connect: medium.favoredBy?.map((fav) => ({
                        id: fav?.id
                    }))
                },
                location: JSON.stringify(medium.location)
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

    recursivelyReadDir = async (directory: string) => {
        const files: string[] = []

        const promises = fs.readdirSync(directory).map(async (file) => {
            const absolute = path.join(directory, file)
            if (fs.statSync(absolute).isDirectory()) {
                await this.recursivelyReadDir(absolute).then((results) => {
                    files.push(...results)
                })
            }
            else {
                files.push(absolute)
            }
        })

        await Promise.all(promises)

        return files
    }

    handleZip = async (zipPath: string) => {
        const zip = new AdmZip(zipPath)

        await zip.extractAllTo(`${env.API_UPLOADS_DIR}/temp`)

        const paths = await this.recursivelyReadDir(`${env.API_UPLOADS_DIR}/temp`)

        const noMacOS = paths.filter((p) => {
            return !p.includes('__MACOSX')
        })

        const promises = noMacOS.map((filePath) => new Promise<DeepPartial<TMedium>>((resolve) => {
            const name = randomUUID()
            const pathName = `${env.API_UPLOADS_DIR}/${name}`

            fs.copyFileSync(filePath, pathName)

            this.generateTags(pathName, name)

            const m = fileToMedium({
                filePath: pathName,
                fileName: name,
                originalName: filePath.split('/').pop() || '',
                user: this.context!.user.id
            }) as DeepPartial<TMedium>

            resolve(m)
        }))

        const results = await Promise.all(promises) as TMedium[]

        fs.rm(`${env.API_UPLOADS_DIR}/temp`, {
            recursive: true
        }, (error) => {
            if (error) {
                console.log(error)
            }
        })

        return results
    }

    writeToDisk = async (filePromises: Promise<FileUpload>[]) => {
        const promises = filePromises.map(async (filePromise) => {
            const name = randomUUID()
            const pathName = `${env.API_UPLOADS_DIR}/${name}`
            const file = await filePromise
            const stream = file.createReadStream()

            // application/x-7z-compressed
            // application/zip
            // application/x-rar
            // console.log(file.mimetype)

            return await new Promise<Promise<TMedium | TMedium[]>>((resolve) => {
                stream.pipe(fs.createWriteStream(pathName)).on('finish', async () => {
                    if (file.mimetype === 'application/zip') {
                        resolve(this.handleZip(pathName))
                    }

                    if (!this.context?.user.id) {
                        return {} as DeepPartial<TMedium>
                    }

                    this.generateTags(pathName, name)

                    const medium = await fileToMedium({
                        filePath: pathName,
                        fileName: name,
                        originalName: file.filename,
                        user: this.context.user.id
                    }) as Promise<TMedium>

                    resolve(medium)
                })
            }) as TMedium
        })

        const media = await Promise.all(promises) as (TMedium[] | TMedium)[]

        const results: TMedium[] = []

        media.forEach((medium) => {
            Array.isArray(medium) ? results.push(...medium) : results.push(medium)
        })

        return results
    }

    reduceToFileSize = async (buffer: Buffer, sizeInMB: number, quality = 80, attempts = 10): Promise<Buffer> => {
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

    generateTags = async (pathName: string, filenameDisk: string) => {
        if (!env.CV_REKOGNITION_ACCESS_KEY_ID || !env.CV_REKOGNITION_SECRET_ACCESS_KEY || !env.CV_REKOGNITION_REGION) {
            return false
        }

        const buffer = await fs.promises.readFile(pathName)

        const bufferForCV = await this.reduceToFileSize(buffer, 4.9)

        const recognize = await getCV()
        const labels = await recognize.labels(bufferForCV)
        const text = await recognize.text(bufferForCV)
        // const faces = await recognize.faces(bufferForCV)

        if (labels && text) {
            await this.writeGeneratedTags([...labels, ...text], filenameDisk)
        }
    }

    getLocationData = async (location: number[]) => {
        // const geocodingClient = GeocodingClient({
        //     accessToken: env.MAPBOX_KEY
        // })
        //
        // const result = await geocodingClient.reverseGeocode({
        //     query: [location[1] || 0, location[0] || 0]
        // }).send()

        // const countryFeature = result.body.features.find((feature) => feature.place_type[0] === 'country')
        // const regionFeature = result.body.features.find((feature) => feature.place_type[0] === 'region')
        // const placeFeature = result.body.features.find((feature) => feature.place_type[0] === 'place')
        // const addressFeature = result.body.features.find((feature) => feature.place_type[0] === 'address')
        //
        // const data = {} as Partial<TMedium>
        //
        // if (countryFeature) {
        //     data.country = countryFeature.text
        // }
        //
        // if (regionFeature) {
        //     data.region = regionFeature.text
        // }
        //
        // if (placeFeature) {
        //     data.place = placeFeature.text
        // }
        //
        // if (addressFeature) {
        //     data.address = addressFeature.text
        // }
        //
        // return data
    }

    writeGeneratedTags = async (tags: string[], filenameDisk: string) => {
        const medium = await this.readOneFromDisk(filenameDisk)

        if (!medium) {
            return
        }

        const r = await this.prisma.medium.update({
            where: {
                id: medium.id
            },
            data: {
                generatedTags: tags.join(', ')
            }
        })

        // this.typesense.collections('media').documents().update({})

        console.log(r)
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

    readOneFromDisk = async (filenameDisk: string) => {
        const db = getDatabase()

        return db.medium.findFirst({
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

        const meta = {
            ...medium.meta,
            width: row.width,
            height: row.height
        }

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

    setStatus = async (ids: string[], status: string) => {
        await this.prisma.medium.updateMany({
            where: {
                id: {
                    in: ids
                }
            },
            data: {
                status
            }
        })

        return this.readMany({
            conditions: {
                id: {
                    in: ids
                }
            }
        })
    }

    download = async (ids: string[]) => {
        const media = await this.readMany({
            conditions: {
                id: {
                    in: ids
                }
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
            zip.addLocalFile(path.join(__dirname, '../../', env.API_UPLOADS_DIR, medium.filenameDisk), '', medium.filenameDownload || medium.filenameDisk)
        })

        if (!fs.existsSync('downloads')) {
            fs.mkdirSync('downloads')
        }

        zip.writeZip(path.join(__dirname, '../../', 'downloads', `${downloadId}.zip`))

        return {
            url: `/downloads/${downloadId}.zip`
        }
    }
}
