import { Details } from '@/components/shared/Details'
import { SearchProvider } from '@/providers/SearchProvider'

type Props = {
    params: {
        idMedium: string
    }
}

const FavoritesDetailPage = ({ params }: Props) => {
    return <SearchProvider
        favorites
    >
        <Details
            id={params.idMedium}
            favorites
        />
    </SearchProvider>
}

export default FavoritesDetailPage
