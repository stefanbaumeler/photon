import { EMediumStatus } from '@/types/app'
import { Details } from '@/components/shared/Details'
import { SearchProvider } from '@/providers/SearchProvider'

type Props = {
    params: {
        idMedium: string
    }
}

const ArchiveDetailPage = ({ params }: Props) => {
    return <SearchProvider status={EMediumStatus.ARCHIVED}>
        <Details
            id={params.idMedium}
            status={EMediumStatus.ARCHIVED}
        />
    </SearchProvider>
}

export default ArchiveDetailPage
