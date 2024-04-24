import { ETrans } from '@/types/translations'
import { useTranslation } from 'react-i18next'
import { usePathname } from 'next/navigation'
import bem from '@/util/bem'
import { useSelectionContext } from '@/providers/SelectionProvider'
import { DownloadAlbumsControl } from '@/components/controls/DownloadAlbumsControl'
import { MoveToTrashControl } from '@/components/controls/MoveToTrashControl'

export const BulkAlbumsControls = () => {
    const { t } = useTranslation()
    const pathname = usePathname()
    const selection = useSelectionContext()
    const selected = [...selection.selected]

    const classes = bem('actions', [
        ['labeled', pathname === '/trash']
    ])

    return <div
        className={classes}
        data-testid="selection"
    >
        <span
            className="actions__count"
            data-testid="select-count"
        >
            {t(ETrans.N_SELECTED, {
                n: selected.length
            })}
        </span>
        <DownloadAlbumsControl
            shortcut
        />
        <MoveToTrashControl
            elements={selected}
            shortcut
        />
    </div>
}
