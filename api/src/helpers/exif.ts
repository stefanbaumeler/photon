import sharp from 'sharp'
import ExifReader from 'exifreader'
import path from 'path'
import { promises as fsPromises } from 'fs'
import MediaInfoFactory, { FormatType, ReadChunkFunc, Result }  from 'mediainfo.js'
import { type MediaInfo, ResultObject, Track } from 'mediainfo.js/dist/types'
// import { createFFmpeg, fetchFile } from '@ffmpeg/ffmpeg'
import { Medium, VideoMeta, ImageMeta } from '../types'

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
    return await ExifReader.load(filePath).then(async (rawMeta) => {
        const sharpMeta = await sharp(filePath).metadata()

        let fNumber = rawMeta.FNumber?.value

        if (fNumber && Array.isArray(fNumber)) {
            fNumber = fNumber.reduce((a, b) => a / b)
        }

        const date = rawMeta.DateTime?.value[0].split(' ')[0].split(':').join('-')
        const time = rawMeta.DateTime?.value[0].split(' ')[1]
        const dateTime = [date, time].join(' ')

        const latRef = rawMeta.GPSLatitudeRef?.value[0] === 'N' ? 1 : -1
        const lngRef = rawMeta.GPSLongitudeRef?.value[0] === 'E' ? 1 : -1

        const rawLat = parseFloat(rawMeta.GPSLatitude?.description || '') * latRef
        const rawLng = parseFloat(rawMeta.GPSLongitude?.description || '') * lngRef

        const lat = Number.isNaN(rawLat) ? null : rawLat
        const lng = Number.isNaN(rawLng) ? null : rawLng

        const mediumData: Partial<Medium> = {
            dateTaken: dateTime,
            hash: hash(JSON.stringify(rawMeta)),
            lat,
            lng
        }

        const meta: ImageMeta = {
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
    })
}

const handleVideo = async (filePath: string) => {
    const analyze = async () => {
        let fileHandle: fsPromises.FileHandle | undefined
        let fileSize: number
        let mediainfo: MediaInfo | undefined
        let result

        const readChunk: ReadChunkFunc = async (size, offset) => {
            const buffer = new Uint8Array(size)

            await fileHandle?.read(buffer, 0, size, offset)

            return buffer
        }

        try {
            fileHandle = await fsPromises.open(filePath, 'r')
            fileSize = (await fileHandle.stat()).size
            mediainfo = await MediaInfoFactory({
                format: 'object',
                full: true
            })
            result = (await mediainfo.analyzeData(() => fileSize, readChunk)) as ResultObject
        } finally {
            fileHandle && await fileHandle.close()
            mediainfo && mediainfo.close()
        }

        return result
    }

    return await analyze().then(async (result) => {
        if (isValidVideoMetadata(result)) {
            const coordinates = getCoordinates(result)
            const dateTaken = getDateTaken(result)
            const dimensions = getDimensions(result)
            const duration = getDuration(result)

            const meta: VideoMeta = {
                duration,
                height: dimensions.height || 0,
                width: dimensions.width || 0
            }

            const mediumData: Partial<Medium> = {
                dateTaken: dateTaken.toISOString(),
                hash: hash(JSON.stringify(result))
            }

            if (coordinates.length) {
                mediumData.lat = coordinates[0]
                mediumData.lng = coordinates[1]
            }

            return {
                data: mediumData,
                meta
            }
        }

        return {
            data: {},
            meta: {} as VideoMeta
        }
    })
}

export const fileToMedium = async ({
    filePath, fileName, originalName, type
}: { filePath: string, fileName: string, originalName: string, type: string}) => {
    const mediumType = type.split('/')[0]
    let info: { data?: Partial<Medium>, meta?: ImageMeta | VideoMeta } = {}

    if (mediumType === 'image') {
        info = await handleImage(filePath)
    }

    if (mediumType === 'video') {
        info = await handleVideo(filePath)
    }

    return {
        mimetype: type,
        filenameDisk: fileName,
        filenameDownload: originalName,
        title: path.parse(originalName).name,
        description: '',
        ...info.data,
        meta: info.meta
    }

    // const ff = createFFmpeg()
    //
    // await ff.load().then(async () => {
    //     ff.FS('writeFile', 'upload.mp4', await fetchFile(filepath))
    //
    //     await ff.run('-print_format', 'json', '-i', 'upload.mp4', '-f', 'ffmetadata', 'out.txt')
    //     const data = ff.FS('readFile', 'out.txt')
    //     const meta = new TextDecoder().decode(data)
    //     console.log(meta)
    //
    //     // return {
    //     //     hash: hash(JSON.stringify(meta)),
    //     //     dateTaken: dateTime,
    //     //     filenameDisk: filename,
    //     //     filenameDownload: originalname,
    //     //     title: path.parse(originalname).name,
    //     //     description: '',
    //     //     height: sharpMeta.height || 0,
    //     //     width: sharpMeta.width || 0,
    //     //     cameraMake: meta.Make?.value[0],
    //     //     cameraModel: meta.Model?.value[0],
    //     //     flash: meta.Flash?.value,
    //     //     fNumber: fNumber,
    //     //     lat,
    //     //     lng
    //     // }
    // })
}
