import { useMUpdateMedium } from '@photon/schema'

const useUpdateMedium = (id: string, description: string) => {
    const [, updateMedium] = useMUpdateMedium()

    return () => {
        updateMedium({
            id,
            description
        })
    }
}

export default useUpdateMedium
