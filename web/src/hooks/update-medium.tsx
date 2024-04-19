import { useMUpdateMedium } from '@photon/schema'

export const useUpdateMedium = (description: string, id?: string) => {
    const [, updateMedium] = useMUpdateMedium()

    return () => {
        if (id) {
            updateMedium({
                id,
                description
            })
        }
    }
}
