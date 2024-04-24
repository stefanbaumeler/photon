import { Details } from '@/components/shared/Details'
import { SearchProvider } from '@/providers/SearchProvider'

type Props = {
    params: {
        idMedium: string
        idAlbum: string
    }
}

const AlbumMediaDetailPage = ({ params }: Props) => {
    return <SearchProvider>
        <Details
            id={params.idMedium}
            album={params.idAlbum}
        />
    </SearchProvider>
}

export default AlbumMediaDetailPage
