import { useMRotate } from '@photon/schema'

export const useRotate = (id: string) => {
    const [, rotate] = useMRotate()

    return async (deg: number) => {
        await rotate({
            id,
            deg
        })
    }
}
