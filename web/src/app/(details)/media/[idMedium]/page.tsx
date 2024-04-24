import { Details } from '@/components/shared/Details'
import { SearchProvider } from '@/providers/SearchProvider'

type Props = {
    params: {
        idMedium: string
    }
}

const MediumDetailPage = ({ params }: Props) => {
    return <SearchProvider>
        <Details
            id={params.idMedium}
        />
    </SearchProvider>
}

export default MediumDetailPage
