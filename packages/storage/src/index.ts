import type { Readable } from 'node:stream'
import { CVDriver } from '@photon/cv'

export class StorageManager {
    private drivers = new Map<string, typeof StorageDriver>()

    registerDriver (name: string, driver: typeof StorageDriver) {
        this.drivers.set(name, driver)
    }

    getDriver = (name: string) => {
        return this.drivers.get(name) as CVDriver | undefined
    }
}

export type Range = {
    start?: number
    end?: number
}

export type Stat = {
    size: number
    modified: Date
}

export declare class StorageDriver {
    constructor(config: Record<string, unknown>)

    read(filepath: string, range?: Range): Promise<Readable>
    write(filepath: string, content: Readable, type?: string): Promise<void>
    delete(filepath: string): Promise<void>
    stat(filepath: string): Promise<Stat>
    exists(filepath: string): Promise<boolean>
    move(src: string, dest: string): Promise<void>
    copy(src: string, dest: string): Promise<void>
    list(prefix?: string): AsyncIterable<string>
}

export type DriverConfig = {
    driver: string
    options: Record<string, unknown>
}
