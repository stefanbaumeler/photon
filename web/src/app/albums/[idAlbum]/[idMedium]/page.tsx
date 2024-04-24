import { Details } from '@/components/shared/Details'
import DetailsLayout from '@/layouts/details-layout'

type Props = {
    params: {
        idMedium: string
        idAlbum: string
    }
}

const AlbumMediaDetailPage = ({ params }: Props) => {
    return <DetailsLayout>
        <Details
            id={params.idMedium}
            album={params.idAlbum}
        />
    </DetailsLayout>
}

export default AlbumMediaDetailPage
