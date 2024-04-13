import { ETrans } from '@/types/translations'
import { useTranslation } from 'react-i18next'
import { useRouter } from 'next/router'
import bem from '@/util/bem'
import { useSelectionContext } from '@/providers'
import { DeleteControl, DownloadAlbumsControl } from '@/components/controls'

export const BulkAlbumsControls = () => {
    const { t } = useTranslation()
    const router = useRouter()
    const selection = useSelectionContext()
    const selected = [...selection.selected]

    const classes = bem('actions', [
        ['labeled', router.pathname === '/trash']
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
        <DeleteControl
            elements={selected}
            shortcut
        />
    </div>
}
