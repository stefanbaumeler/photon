import { Details } from '@/components/shared/Details'
import { EMediumStatus } from '@/types/app'
import { SearchProvider } from '@/providers/SearchProvider'

type Props = {
    params: {
        idMedium: string
    }
}

const TrashDetailPage = ({ params }: Props) => {
    return <SearchProvider status={EMediumStatus.TRASH}>
        <Details
            id={params.idMedium}
            status={EMediumStatus.TRASH}
        />
    </SearchProvider>
}

export default TrashDetailPage
