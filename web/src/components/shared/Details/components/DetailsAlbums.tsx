import { useDetailsContext } from '@/providers'
import { useQAlbumsOfMedium } from '@photon/schema'
import { useTranslation } from 'react-i18next'
import { ETrans } from '@/types/translations'
import { DetailsSection, DetailsAlbum } from '..'
import { useRouter } from 'next/router'

export const DetailsAlbums = () => {
    const details = useDetailsContext()
    const { t } = useTranslation()
    const router = useRouter()

    const id = Array.isArray(router.query.idMedium) ? router.query.idMedium?.join('') : router.query.idMedium

    const [{ data: result }] = useQAlbumsOfMedium({
        variables: {
            id: id ?? ''
        },
        pause: !id
    })

    const albums  = result?.mediumAlbums

    return albums?.length ? <DetailsSection title={t(ETrans.ALBUM_PLURAL)}>
        {albums?.map((album, key) => <DetailsAlbum
            album={album}
            key={key}
            onClick={async () => {
                await details.close()
            }}
        />)}
    </DetailsSection> : null
}
