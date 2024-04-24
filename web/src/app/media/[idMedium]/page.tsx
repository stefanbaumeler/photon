import { Details } from '@/components/shared/Details'
import DetailsLayout from '@/layouts/details-layout'

type Props = {
    params: {
        idMedium: string
    }
}

const MediaDetailPage = ({ params }: Props) => {
    return <DetailsLayout>
        <Details id={params.idMedium} />
    </DetailsLayout>
}

export default MediaDetailPage
