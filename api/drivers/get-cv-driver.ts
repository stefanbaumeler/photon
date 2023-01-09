import type { CVDriver } from '@photon/cv'

export const drivers: Record<string, string> = {
    rekognition: '@photon/driver-cv-rekognition',
    mscv: '@photon/driver-cv-mscv',
    gcv: '@photon/driver-cv-gcv'
}

export const getCVDriver = async (driverName: string) => {
    const driver = Object.keys(drivers).find((driver) => driver === driverName)

    if (!driver) {
        throw new Error(`Computer Vision Driver "${driverName}" doesn't exist.`)
    }

    const driverPath = drivers[driver]

    return (await import(driverPath)).default as typeof CVDriver
}
