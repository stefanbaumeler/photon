export class CVManager {
    private drivers = new Map<string, CVDriver>()

    registerDriver = (name: string, driver: CVDriver) => {
        this.drivers.set(name, driver)
    }

    getDriver = (name: string) => {
        return this.drivers.get(name) as CVDriver | undefined
    }
}

export declare class CVDriver {
    constructor(config: Record<string, unknown>)

    labels(buffer: Buffer): Promise<string[]>

    text(buffer: Buffer): Promise<string[]>

    faces(buffer: Buffer): Promise<string[]>
}

export type DriverConfig = {
    driver: string
    options: Record<string, unknown>
}
