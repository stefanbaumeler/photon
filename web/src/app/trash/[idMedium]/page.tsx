import { Details } from '@/components/shared/Details'
import DetailsLayout from '@/layouts/details-layout'
import { EMediumStatus } from '@/types/app'

type Props = {
    params: {
        idMedium: string
    }
}

const TrashDetailPage = ({ params }: Props) => {
    return <DetailsLayout status={EMediumStatus.TRASH}>
        <Details
            id={params.idMedium}
            status={EMediumStatus.TRASH}
        />
    </DetailsLayout>
}

export default TrashDetailPage
