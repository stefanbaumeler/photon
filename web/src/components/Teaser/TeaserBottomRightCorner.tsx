import Icon from '@mdi/react'
import * as Icons from '@mdi/js'
import { useTeaserContext } from './TeaserContext'
import bem from 'web/src/util/bem'
import { ESelectionMode } from 'web/src/types/app'
import { useDetailsContext, useSelectionContext } from 'web/src/providers'
import { isMedium } from 'web/src/util/is'

export const TeaserBottomRightCorner = () => {
    const { element } = useTeaserContext()
    const selection = useSelectionContext()
    const details = useDetailsContext()

    if (!isMedium(element)) {
        return <></>
    }

    const open = () => {
        details.open(element)
    }

    const fallbackButtonClasses = bem('teaser__open-fallback', [
        ['delete', selection.mode === ESelectionMode.DELETE],
        ['single', selection.mode === ESelectionMode.SINGLE]
    ])

    return <button
        data-testid="teaser-details-fallback"
        className={fallbackButtonClasses}
        onClick={open}
    >
        <Icon
            path={Icons.mdiMagnifyPlusOutline}
            size={1}
        />
    </button>
}
