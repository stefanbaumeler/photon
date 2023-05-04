import { useTeaserContext } from './TeaserContext'
import Icon from '@mdi/react'
import * as Icons from '@mdi/js'
import { isMedium } from '@/util/is'

export const TeaserBottomLeftCorner = () => {
    const { element } = useTeaserContext()

    if (!isMedium(element) || !element.favoredBy?.length) {
        return <></>
    }

    return <div className="teaser__categories">
        <Icon
            data-testid={'favorite-mark'}
            path={Icons.mdiStar}
            className="teaser__favorite"
            size={1}
        />
    </div>
}
