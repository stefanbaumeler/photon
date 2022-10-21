import { useMediaQuery, useMediumQuery } from '@/types/api'
import { stateFrom } from '@/api/hooks/helpers'
import { TMediaInput, TMediumInput } from '@/types/app'

export const useMedia = (options: { variables?: TMediaInput, skip?: boolean } = {
    variables: {},
    skip: false
}) => {
    const {
        data, refetch
    } = useMediaQuery({
        variables: options.variables,
        skip: options.skip
    })

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

    return {
        state: stateFrom((data?.medium || [])[0], {}),
        refetch
    }
}
