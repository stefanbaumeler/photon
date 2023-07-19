import { useDetailsContext } from '@/providers'
import { useMRotate } from '@photon/schema'

const useRotate = (idMedium: string) => {
    const details = useDetailsContext()

    const [, rotate] = useMRotate()

    return () => {
        rotate({
            id: idMedium
        }).then(() => {
            details.setMedium(details.medium)
        })
    }
}

export default useRotate
