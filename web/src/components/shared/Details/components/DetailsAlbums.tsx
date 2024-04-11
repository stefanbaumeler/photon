import { useDetailsContext } from '@/providers'
import { useQAlbumsOfMedium } from '@photon/schema'
import { useTranslation } from 'react-i18next'
import { ETrans } from '@/types/translations'
import { DetailsSection, DetailsAlbum } from '..'

export const DetailsAlbums = () => {
    const details = useDetailsContext()
    const { t } = useTranslation()

    const [{ data: result }] = useQAlbumsOfMedium({
        variables: {
            id: details.medium.id
        }
    })

    const albums  = result?.mediumAlbums

    return albums?.length ? <DetailsSection title={t(ETrans.ALBUM_PLURAL)}>
        {albums?.map((album, key) => <DetailsAlbum
            album={album}
            key={key}
        />)}
    </DetailsSection> : null
}
