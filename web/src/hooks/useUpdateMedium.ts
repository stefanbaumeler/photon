import { useMUpdateMedium } from '@photon/schema/dist/client'

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
