import { Details } from '@/components/shared/Details'
import DetailsLayout from '@/layouts/details-layout'

type Props = {
    params: {
        idMedium: string
    }
}

const FavoritesDetailPage = ({ params }: Props) => {
    return <DetailsLayout favorites>
        <Details
            id={params.idMedium}
            favorites
        />
    </DetailsLayout>
}

export default FavoritesDetailPage
