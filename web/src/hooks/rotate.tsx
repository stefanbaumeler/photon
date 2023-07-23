import { useDetailsContext } from '@/providers'
import { TMedium, useMRotate } from '@photon/schema'

const useRotate = (medium: TMedium) => {
    const details = useDetailsContext()

    const [, rotate] = useMRotate()

    return () => {
        rotate({
            id: medium.id
        }).then(() => {
            details.setMedium(details.medium)
        })
    }
}

export default useRotate
