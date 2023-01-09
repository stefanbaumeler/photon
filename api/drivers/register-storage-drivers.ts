import { getStorageDriver } from './get-storage-driver'
import type { StorageManager } from '@photon/storage'

export const registerStorageDrivers = async (manager: StorageManager) => {
    const env = process.env

    const usedDrivers: string[] = []

    for (const [key, value] of Object.entries(env)) {
        if ((key.startsWith('STORAGE_') && key.endsWith('_DRIVER')) === false) {
            continue
        }

        if (value && !usedDrivers.includes(value)) {
            usedDrivers.push(value)
        }
    }

    for (const driverName of usedDrivers) {
        const driver = await getStorageDriver(driverName)

        if (driver) {
            manager.registerDriver(driverName, driver)
        }
    }
}
