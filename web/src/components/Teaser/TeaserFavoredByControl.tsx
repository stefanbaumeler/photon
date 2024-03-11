import Icon from '@mdi/react'
import * as Icons from '@mdi/js'

type Props = {
    count: number
    displayCount?: boolean
}

export const TeaserFavoredByControl = ({
    count, displayCount = false
}: Props) => {
    return <div className="teaser__categories">
        <Icon
            data-testid={'favorite-mark'}
            path={Icons.mdiStar}
            className="teaser__favorite"
            size={1}
        />
        {displayCount ? count : undefined}
    </div>
}
