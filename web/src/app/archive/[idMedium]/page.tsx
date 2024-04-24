import { EMediumStatus } from '@/types/app'
import { Details } from '@/components/shared/Details'
import DetailsLayout from '@/layouts/details-layout'

type Props = {
    params: {
        idMedium: string
    }
}

const ArchiveDetailPage = ({ params }: Props) => {
    return <DetailsLayout status={EMediumStatus.ARCHIVED}>
        <Details
            id={params.idMedium}
            status={EMediumStatus.ARCHIVED}
        />
    </DetailsLayout>
}

export default ArchiveDetailPage
