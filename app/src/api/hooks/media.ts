import { useMediaQuery } from '@/types/api'
import { stateFrom } from '@/api/hooks/helpers'
import { TMediaInput } from '@/types/app'

export const useMedia = (variables: TMediaInput = {}) => {
    const {
        data, refetch
    } = useMediaQuery({
        variables
    })

    return {
        state: stateFrom(data, {
            media: []
        }),
        refetch
    }
}
