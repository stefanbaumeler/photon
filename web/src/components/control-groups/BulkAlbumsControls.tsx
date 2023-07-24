import { ETrans } from '@/types/translations'
import { useTranslation } from 'react-i18next'
import { ESelectionMode } from '@/types/app'
import { useRouter } from 'next/router'
import bem from '@/util/bem'
import { useSelectionContext } from '@/providers'
import { DeleteControl, DownloadControl } from '@/components/controls'
import { isAlbums } from '@/util/is'

export const BulkAlbumsControls = () => {
    const { t } = useTranslation()
    const router = useRouter()
    const selection = useSelectionContext()
    const selected = [...selection.selected]

    if (selection.mode !== ESelectionMode.SELECT || !selected.length || !isAlbums(selected)) {
        return <></>
    }

    const classes = bem('actions', [
        ['labeled', router.pathname === '/trash']
    ])

    return <div className={classes}>
        <span
            className="actions__count"
            data-testid="select-count"
        >
            {t(ETrans.N_SELECTED, {
                n: selected.length
            })}
        </span>
        <DownloadControl
            elements={selected}
            shortcut={true}
        />
        <DeleteControl
            elements={selected}
            shortcut={true}
        />
    </div>
}
