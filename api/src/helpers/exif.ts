import sizeOf from 'image-size'
import ExifReader from 'exifreader'
import path from 'path'

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

export const exifToMedium = (filepath: string, filename: string, originalname: string) => {
    const dimensions = sizeOf(filepath)

    return ExifReader.load(filepath).then((meta) => {
        let fNumber = meta.FNumber?.value

        if (fNumber && Array.isArray(fNumber)) {
            fNumber = fNumber.reduce((a, b) => a / b)
        }

        const date = meta.DateTime?.value[0].split(' ')[0].split(':').join('-')
        const time = meta.DateTime?.value[0].split(' ')[1]
        const dateTime = [date, time].join(' ')

        const latRef = meta.GPSLatitudeRef?.value[0] === 'N' ? 1 : -1
        const lngRef = meta.GPSLongitudeRef?.value[0] === 'E' ? 1 : -1

        const rawLat = parseFloat(meta.GPSLatitude?.description || '') * latRef
        const rawLng = parseFloat(meta.GPSLongitude?.description || '') * lngRef

        const lat = Number.isNaN(rawLat) ? null : rawLat
        const lng = Number.isNaN(rawLng) ? null : rawLng

        return {
            hash: hash(JSON.stringify(meta)),
            dateTaken: dateTime,
            filenameDisk: filename,
            filenameDownload: originalname,
            title: path.parse(originalname).name,
            description: '',
            height: dimensions.height || 0,
            width: dimensions.width || 0,
            cameraMake: meta.Make?.value[0],
            cameraModel: meta.Model?.value[0],
            flash: meta.Flash?.value,
            fNumber: fNumber,
            lat,
            lng
        }
    })
}
