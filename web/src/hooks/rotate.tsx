import { useDetailsContext } from '@/providers'
import { useMRotate } from '@photon/schema'

export const useRotate = (id: string) => {
    const details = useDetailsContext()

    const [, rotate] = useMRotate()

    return () => {
        rotate({
            id
        }).then(() => {
            details.setMedium(details.medium)
        })
    }
}
