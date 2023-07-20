import { useMUpdateMedium } from '@photon/schema'

const useUpdateMedium = (id: string, description: string) => {
    const [, updateMedium] = useMUpdateMedium()

    return () => {
        console.log(id, description)
        updateMedium({
            id,
            description
        })
    }
}

export default useUpdateMedium
