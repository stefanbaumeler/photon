import sharp from 'sharp'
import ExifReader from 'exifreader'
import path from 'path'
import { promises as fsPromises } from 'fs'
import MediaInfoFactory, { ReadChunkFunc } from 'mediainfo.js'
import { ResultObject, Track } from 'mediainfo.js/dist/types'
import { TMedium, TVideoMeta, TImageMeta } from '@photon/schema'
import { DeepPartial } from '../types'
import mime from 'mime-types'

export const hash = (str: string, seed = 0) => {
    // https://stackoverflow.com/a/52171480

    let h1 = 0xdeadbeef ^ seed,
        h2 = 0x41c6ce57 ^ seed
    for (let i = 0, ch; i < str.length; i++) {
        ch = str.charCodeAt(i)
        h1 = Math.imul(h1 ^ ch, 2654435761)
        h2 = Math.imul(h2 ^ ch, 1597334677)
    }

    h1 = Math.imul(h1 ^ h1 >>> 16, 2246822507) ^ Math.imul(h2 ^ h2 >>> 13, 3266489909)
    h2 = Math.imul(h2 ^ h2 >>> 16, 2246822507) ^ Math.imul(h1 ^ h1 >>> 13, 3266489909)

    return 4294967296 * (2097151 & h2) + (h1 >>> 0)
}

const isValidVideoMetadata = (result: ResultObject) => {
    if (typeof result.media === 'undefined') {
        return false
    }

    if (typeof result.media.track === 'undefined') {
        return false
    }

    return Array.isArray(result.media.track)
}
const getCoordinates = (result: ResultObject) => {
    const extras: any[] = []

    result.media.track.forEach((track: Track) => {
        if (track.extra) {
            extras.push(track.extra)
        }
    })

    const coordinates: number[] = []

    extras.forEach((extra) => {
        Object.values(extra).forEach((maybeCoordinates) => {
            if (typeof maybeCoordinates !== 'string') {
                return false
            }

            const absoluteCoordinates = maybeCoordinates.split(/[+-]/g)

            const floatCoordinates = absoluteCoordinates
                .map((c) => parseFloat(c))
                .filter((c) => !isNaN(c))

            if (floatCoordinates.length !== 2) {
                return false
            }

            if (maybeCoordinates.startsWith('-')) {
                floatCoordinates[0] *= -1
            }

            if (maybeCoordinates.substring(1, maybeCoordinates.length - 1).includes('-')) {
                floatCoordinates[1] *= -1
            }

            coordinates.push(...floatCoordinates)
        })
    })

    return coordinates
}

const getDateTaken = (result: ResultObject) => {
    const dates: string[] = []

    result.media.track.forEach((track) => {
        if (typeof track['Encoded_Date'] === 'string') {
            dates.push(track['Encoded_Date'])
        }
    })

    const dDates = dates.map((strDate) => new Date(strDate).getTime())

    return new Date(Math.max(...dDates))
}

const getDimensions = (result: ResultObject) => {
    let dimensions = {
        width: 0,
        height: 0
    }
    result.media.track.forEach((track) => {
        if (track['@type'] === 'Video') {
            const width = parseInt(track['Width'] as string, 10)
            const height = parseInt(track['Height'] as string, 10)

            if (!isNaN(width) && !isNaN(height)) {
                dimensions = {
                    width,
                    height
                }
            }
        }
    })

    return dimensions
}

const getDuration = (result: ResultObject) => {
    const durations = result.media.track.map((track) => track['Duration']).filter((duration) => {
        return typeof duration === 'string' && duration.length
    }) as string[]

    if (!durations.length) {
        return 0
    }

    return parseInt(durations[0], 10)
}

const handleImage = async (filePath: string) => {
    const sharpMeta = await sharp(filePath).metadata()
    const rawMeta = await ExifReader.load(filePath)

    let fNumber = rawMeta.FNumber?.value

    if (fNumber && Array.isArray(fNumber)) {
        fNumber = fNumber.reduce((a, b) => a / b)
    }

    const date = rawMeta.DateTime?.value[0].split(' ')[0].split(':').join('-')
    const time = rawMeta.DateTime?.value[0].split(' ')[1]
    const dateTime = new Date([date, time].join(' '))

    const latRef = rawMeta.GPSLatitudeRef?.value[0] === 'N' ? 1 : -1
    const lngRef = rawMeta.GPSLongitudeRef?.value[0] === 'E' ? 1 : -1

    const rawLat = parseFloat(rawMeta.GPSLatitude?.description || '') * latRef
    const rawLng = parseFloat(rawMeta.GPSLongitude?.description || '') * lngRef

    const lat = Number.isNaN(rawLat) ? null : rawLat
    const lng = Number.isNaN(rawLng) ? null : rawLng

    const mediumData: Partial<TMedium> = {
        dateTaken: dateTime,
        hash: hash(JSON.stringify(rawMeta)).toString(),
        location: [lat, lng]
    }

    const meta: Partial<TImageMeta> = {
        height: sharpMeta.height || 0,
        width: sharpMeta.width || 0,
        cameraMake: rawMeta.Make?.value[0],
        cameraModel: rawMeta.Model?.value[0],
        flash: rawMeta.Flash?.value,
        fNumber: fNumber
    }

    return {
        data: mediumData,
        meta
    }
}

const handleVideo = (filePath: string) => new Promise<{ data: Partial<TMedium>, meta: Partial<TVideoMeta> }>((resolve) => {
    const analyze = async () => {
        const readChunk: ReadChunkFunc = async (size, offset) => {
            const buffer = new Uint8Array(size)

            await fileHandle?.read(buffer, 0, size, offset)

            return buffer
        }

        const fileHandle = await fsPromises.open(filePath, 'r')

        const stats = await fileHandle.stat()
        const mediaInfo = await MediaInfoFactory({
            coverData: true,
            format: 'object',
            full: true
        })

        return new Promise<ResultObject>((res) => {
            mediaInfo?.analyzeData(() => stats.size, readChunk, (result) => {
                fileHandle && fileHandle.close()
                mediaInfo && mediaInfo.close()
                res(result as ResultObject)
            })
        })
    }

    return analyze().then((result) => {
        if (isValidVideoMetadata(result)) {
            const coordinates = getCoordinates(result)
            const dateTaken = getDateTaken(result)
            const dimensions = getDimensions(result)
            const duration = getDuration(result)

            const meta: TVideoMeta = {
                duration,
                height: dimensions.height || 0,
                width: dimensions.width || 0
            }

            const mediumData: Partial<TMedium> = {
                dateTaken: dateTaken.toISOString(),
                hash: hash(JSON.stringify(result)).toString()
            }

            if (coordinates.length) {
                mediumData.location = coordinates
            }

            resolve({
                data: mediumData,
                meta
            })
        }

        resolve({
            data: {},
            meta: {}
        })
    })
})

export const fileToMedium = async ({
    filePath, fileName, originalName, type, user
}: { filePath: string, fileName: string, originalName: string, type?: string, user: string }) => {
    const mimetype = type || mime.lookup(originalName) || ''
    const mediumType = mimetype.split('/')[0]

    const handleMeta = (info: { data?: Partial<TMedium>, meta?: Partial<TImageMeta | TVideoMeta> }) => {
        return {
            mimetype,
            filenameDisk: fileName,
            filenameDownload: originalName,
            title: path.parse(originalName).name,
            description: '',
            ...info.data,
            meta: info.meta,
            owner: {
                id: user
            },
            uploader: {
                id: user
            }
        } as DeepPartial<TMedium> & { id?: string }
    }

    if (mediumType === 'image') {
        return handleImage(filePath).then(handleMeta)
    }

    if (mediumType === 'video') {
        return handleVideo(filePath).then(handleMeta)
    }
}
