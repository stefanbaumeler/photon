import { getCVDriver } from './get-cv-driver'
import type { CVManager } from '@photon/cv'

export const registerCVDrivers = async (manager: CVManager) => {
    const driverName = process.env.CV_DRIVER as string
    const Driver = await getCVDriver(driverName)

    if (Driver) {
        manager.registerDriver(driverName, new Driver({}))
    }
}
