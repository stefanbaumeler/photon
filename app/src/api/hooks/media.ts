import { useMediaQuery, useMediumQuery } from '@/types/api'
import { stateFrom } from '@/api/hooks/helpers'
import { TMediaInput, TMediumInput } from '@/types/app'

export const useMedia = (variables: TMediaInput = {}) => {
    const {
        data, refetch
    } = useMediaQuery({
        variables
    })

    refetch()

    return {
        state: stateFrom(data?.media, []),
        refetch
    }
}

export const useMedium = (variables: TMediumInput) => {
    const {
        data, refetch
    } = useMediumQuery({
        variables
    })

    refetch()

    return {
        state: stateFrom((data?.medium || [])[0], {}),
        refetch
    }
}
