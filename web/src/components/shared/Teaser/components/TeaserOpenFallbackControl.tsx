import Icon from '@mdi/react'
import * as Icons from '@mdi/js'
import bem from '@/util/bem'
import { ESelectionMode } from '@/types/app'
import { useSelectionContext } from '@/providers/SelectionProvider'
import Link from 'next/link'

type Props = {
    href: string
}

export const TeaserOpenFallbackControl = ({ href }: Props) => {
    const selection = useSelectionContext()

    const fallbackButtonClasses = bem('teaser__open-fallback', [
        ['delete', selection.mode === ESelectionMode.DELETE],
        ['single', selection.mode === ESelectionMode.SINGLE]
    ])

    return <Link
        href={href}
        data-testid="teaser-details-fallback"
        className={fallbackButtonClasses}
    >
        <Icon
            path={Icons.mdiMagnifyPlusOutline}
            size={1}
        />
    </Link>
}
