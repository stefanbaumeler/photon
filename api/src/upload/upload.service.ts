import { Injectable } from '@nestjs/common'
import { MediumRepository } from '../medium/medium.repository'
import fs from 'fs'
import { getEnv } from '../../env'
import { randomUUID } from 'crypto'
import path from 'path'
import { fileToMedium } from '../helpers/exif'
import { Prisma } from '@prisma/client'
import { MediumUploadDto } from '../medium/medium.dto'
import AdmZip from 'adm-zip'
import sharp from 'sharp'
import { getCV } from '../../drivers'
import { ClsService } from 'nestjs-cls'
import { Request, Response } from 'express'
import { IdDto } from '../shared/dto'

const env = getEnv()

@Injectable()
export class UploadService {
    constructor (private repository: MediumRepository, private cls: ClsService) {}

    async serve (dto: IdDto, req: Request, res: Response) {
        res.setHeader('Content-Type', 'image/jpeg')

        try {
            const medium = await this.repository.findOneByFilenameDisk({
                filenameDisk: dto.id
            })

            if (medium?.idOwner !== this.cls.get('userId')) {
                res.statusCode = 403
                res.send()
                return
            }

            if (!req.query.download) {
                this.resize(path.join(__dirname, '../../../', `./uploads/${dto.id}`), req.query.w as string).pipe(res)
            }
            else {
                await this.repository.findOneByFilenameDisk({
                    filenameDisk: dto.id
                }).then((medium) => {
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

    async writeToDisk (dto: MediumUploadDto) {
        const userId = this.cls.get('userId')
        const promises = dto.filePromises.map(async (filePromise) => {
            const name = randomUUID()
            const pathName = `${env.API_UPLOADS_DIR}/${name}`
            const file = await filePromise
            const stream = file.createReadStream()

            // application/x-7z-compressed
            // application/zip
            // application/x-rar
            // console.log(file.mimetype)

            return await new Promise<Prisma.MediumCreateInput[] | Prisma.MediumCreateInput>((resolve) => {
                stream.pipe(fs.createWriteStream(pathName)).on('finish', async () => {
                    if (file.mimetype === 'application/zip') {
                        resolve(this.handleZip(pathName, userId))
                    }

                    if (!userId) {
                        return {}
                    }

                    this.generateTags(pathName, name)

                    const medium = await fileToMedium({
                        filePath: pathName,
                        fileName: name,
                        originalName: file.filename,
                        user: userId
                    })

                    resolve(medium)
                })
            })
        })

        const media = await Promise.all(promises)

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

            this.generateTags(pathName, name)

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

    async generateTags (pathName: string, filenameDisk: string) {
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

    async writeGeneratedTags (tags: string[], filenameDisk: string) {
        const medium = await this.repository.findOneByFilenameDisk({
            filenameDisk
        })

        // await this.repository.update({
        //     where: {
        //         id: medium.id
        //     },
        //     data: {
        //         tags: {
        //             connectOrCreate: tags.map((tag) => {
        //                 return {
        //                     where: {
        //                         idUser_label: {
        //                             idUser: userId,
        //                             label: tag
        //                         }
        //                     },
        //                     create: {
        //                         idUser: userId,
        //                         label: tag
        //                     }
        //                 }
        //             })
        //         }
        //     }
        // })
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
}
