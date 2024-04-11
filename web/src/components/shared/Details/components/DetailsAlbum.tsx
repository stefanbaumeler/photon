import { ETrans } from '@/types/translations'
import { formatDate } from '@/util/date'
import { EDateFormat, TCover } from '@/types/app'
import { Detail } from '@/components'
import { useTranslation } from 'react-i18next'
import { TMedium } from '@photon/schema'

type TAlbumDetail = {
    media?: Partial<TMedium>[]
    cover?: TCover
    dateCreated: string
    title?: string
}

export const DetailsAlbum = ({ album }: { album: TAlbumDetail}) => {
    const { t } = useTranslation()
    const count = t(ETrans.ELEMENT_COUNT_NUMBER, {
        count: album.media?.length
    })

    const date = formatDate(album.dateCreated, EDateFormat.SHORT)

    return <Detail
        icon={album.cover}
        title={album.title}
        values={[count, date]}
    />
}
