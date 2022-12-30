import type { StorageDriver } from '@photon/storage'

export const _aliasMap: Record<string, string> = {
    local: '@photon/driver-storage-local',
    azure: '@photon/driver-storage-azure',
    gcs: '@photon/driver-storage-gcs',
    s3: '@photon/driver-storage-s3'
}

export const getStorageDriver = async (driverName: string): Promise<typeof StorageDriver> => {
    if (driverName in _aliasMap) {
        driverName = _aliasMap[driverName]
    } else {
        throw new Error(`Driver "${driverName}" doesn't exist.`)
    }

    return (await import(driverName)).default
}
