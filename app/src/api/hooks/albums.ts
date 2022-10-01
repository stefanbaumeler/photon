import { useAlbumMediaQuery, useAlbumQuery, useAlbumsQuery } from '@/types/api'
import { stateFrom } from '@/api/hooks/helpers'
import { TAlbumInput, TAlbumsInput } from '@/types/app'

export const useAlbums = (variables: TAlbumsInput = {}) => {
    const {
        data, refetch
    } = useAlbumsQuery({
        variables
    })

    return {
        state: stateFrom(data?.albums, []),
        refetch
    }
}

export const useAlbum = (variables: TAlbumInput) => {
    const {
        data, refetch
    } = useAlbumQuery({
        variables
    })

    return {
        state: stateFrom((data?.album || [])[0], {}),
        refetch
    }
}

export const useAlbumMedia = (variables: TAlbumInput) => {
    const {
        data, refetch
    } = useAlbumMediaQuery({
        variables
    })

    return {
        state: stateFrom(data?.albumMedia, []),
        refetch
    }
}
