import { registerStorageDrivers } from './register-storage-drivers'
import { registerCVDrivers } from './register-cv-drivers'
import type { StorageManager, StorageDriver } from '@photon/storage'
import type { CVManager, CVDriver } from '@photon/cv'

const managers = {
    cv: {
        manager: null as null | CVManager,
        driver: null as null | CVDriver
    },
    storage: {
        manager: null as null | StorageManager,
        driver: null as null | StorageDriver
    }
}

export const getStorage = async (): Promise<StorageDriver> => {
    if (managers.storage.driver) {
        return managers.storage.driver
    }

    const { StorageManager } = await import('@photon/storage')

    const name = process.env.CV_DRIVER as string

    managers.storage.manager = new StorageManager()

    await registerStorageDrivers(managers.storage.manager)

    const driver = managers.storage.manager.getDriver(name) as StorageDriver | undefined

    if (!driver) {
        throw new Error(`Storage Driver "${name}" doesn't exist.`)
    }

    managers.storage.driver = driver

    return driver
}

export const getCV = async (): Promise<CVDriver> => {
    if (managers.cv.driver) {
        return managers.cv.driver
    }

    const { CVManager } = await import('@photon/cv')

    const name = process.env.CV_DRIVER as string

    managers.cv.manager = new CVManager()

    await registerCVDrivers(managers.cv.manager)

    const driver = managers.cv.manager.getDriver(name) as CVDriver | undefined

    if (!driver) {
        throw new Error(`Computer Vision Driver "${name}" doesn't exist.`)
    }

    managers.cv.driver = driver

    return managers.cv.driver
}
