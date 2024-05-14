import { Injectable } from '@nestjs/common'
import { MediumRepository } from '../medium/medium.repository'
import fs from 'fs'
import { getEnv } from '../../env'
import { randomUUID } from 'crypto'
import path from 'path'
import { fileToMedium } from '../helpers/exif'
import AdmZip from 'adm-zip'
import sharp from 'sharp'
import { ClsService } from 'nestjs-cls'
import { Request, Response } from 'express'
import { IdDto } from '../shared/dto'
import GeocodingClient from '@mapbox/mapbox-sdk/services/geocoding'
import { MediumCreateDto } from '../medium/medium.dto'

const env = getEnv()

@Injectable()
export class UploadService {
    constructor (private mediumRepository: MediumRepository, private cls: ClsService) { }

    async serve (dto: IdDto, req: Request, res: Response) {
        res.setHeader('Content-Type', 'image/jpeg')

        try {
            const medium = await this.mediumRepository.findById(dto, {
                owner: true
            })

            if (medium?.owner.id !== this.cls.get('userId')) {
                console.log(medium?.owner.id)
                res.statusCode = 403
                res.send()
                return
            }

            if (!req.query.download) {
                this.resize(path.join(__dirname, '../../../', `./uploads/${dto.id}`), req.query.w as string).pipe(res)
            }
            else {
                await this.mediumRepository.findById(dto).then((medium) => {
                    if (medium) {
                        res.setHeader(
                            'Content-disposition',
                            `attachment; filename=${medium.filenameDownload}`
                        )
                        this.resize(path.join(__dirname, '../../../', `./uploads/${req.params.id}`), req.query.w as string).pipe(res)
                    }
                })
            }
        }
        catch (e) {
            console.log(e)
            res.statusCode = 403
            res.send()
        }
    }

    resize (p: string, width?: string) {
        const readStream = fs.createReadStream(p)
        const transform = sharp()

        if (width) {
            const resized = transform.resize(+width)
            return readStream.pipe(resized)
        }

        return readStream
    }

    async handleUploads (files: Express.Multer.File[]) {
        const userId = this.cls.get('userId')

        const mediaPromises = files.map(async (file) => {
            // application/x-7z-compressed
            // application/zip
            // application/x-rar
            // console.log(file.mimetype)

            if (file.mimetype === 'application/zip') {
                return await this.handleZip(file.path, userId)
            }

            if (!userId) {
                console.log(userId, 'rejected')
                return []
            }

            return await fileToMedium({
                filePath: file.path,
                fileName: file.filename,
                originalName: file.originalname,
                user: userId,
                type: file.mimetype
            })
        })

        const media = await Promise.all(mediaPromises)
        return media.flat()
    }

    async handleZip (zipPath: string, userId: string) {
        const zip = new AdmZip(zipPath)

        await zip.extractAllTo(`${env.API_UPLOADS_DIR}/temp`)

        const paths = await this.recursivelyReadDir(`${env.API_UPLOADS_DIR}/temp`)

        const noMacOS = paths.filter((p) => {
            return !p.includes('__MACOSX')
        })

        const promises = noMacOS.map(async (filePath) => {
            const name = randomUUID()
            const pathName = `${env.API_UPLOADS_DIR}/${name}`

            fs.copyFileSync(filePath, pathName)

            return await fileToMedium({
                filePath: pathName,
                fileName: name,
                originalName: filePath.split('/').pop() || '',
                user: userId
            })
        })

        const results = await Promise.all(promises)

        fs.rm(`${env.API_UPLOADS_DIR}/temp`, {
            recursive: true
        }, (error) => {
            if (error) {
                console.log(error)
            }
        })

        return results
    }

    async recursivelyReadDir (directory: string) {
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

    async createMany (media: MediumCreateDto[]) {
        const promises = media.map((medium) => {
            return this.createOne(medium)
        })

        return await Promise.all(promises).then((results) => {
            return results.filter((result) => result !== undefined)
        })
    }

    async createOne (medium: MediumCreateDto) {
        const existing = await this.mediumRepository.findByIdOrHash(medium)

        if (existing && medium.filenameDisk) {
            const existingPath = path.join(__dirname, '../../../', env.API_UPLOADS_DIR, medium.filenameDisk)

            if (fs.existsSync(existingPath)) {
                fs.unlinkSync(path.join(__dirname, '../../../', env.API_UPLOADS_DIR, medium.filenameDisk))
            }

            return existing
        }

        const locationData = await this.getLocationData(medium.location)

        return await this.mediumRepository.createOne({
            ...medium,
            ...locationData
        })
    }

    getLocationData = async (location?: [number, number]) => {
        if (!location || typeof location !== 'object' || !Array.isArray(location) || !location[0] || !location[1]) {
            return {}
        }

        const geocodingClient = GeocodingClient({
            accessToken: env.MAPBOX_KEY
        })

        const result = await geocodingClient.reverseGeocode({
            query: [location[1], location[0]],
            language: ['en-US']
        }).send()

        const countryFeature = result.body.features.find((feature) => feature.place_type[0] === 'country')
        const regionFeature = result.body.features.find((feature) => feature.place_type[0] === 'region')
        const placeFeature = result.body.features.find((feature) => feature.place_type[0] === 'place')
        const addressFeature = result.body.features.find((feature) => feature.place_type[0] === 'address')

        const data = {} as Partial<MediumCreateDto>

        if (countryFeature) {
            data.country = countryFeature.text
        }

        if (regionFeature) {
            data.region = regionFeature.text
        }

        if (placeFeature) {
            data.place = placeFeature.text
        }

        if (addressFeature) {
            data.address = addressFeature.text
        }

        return data
    }
}
