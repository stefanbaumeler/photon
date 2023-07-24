import { useMUpdateMedium } from '@photon/schema'

export const useUpdateMedium = (id: string, description: string) => {
    const [, updateMedium] = useMUpdateMedium()

    return () => {
        updateMedium({
            id,
            description
        })
    }
}
