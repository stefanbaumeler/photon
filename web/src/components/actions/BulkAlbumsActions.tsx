import { ETrans } from '@/types/translations'
import { useTranslation } from 'react-i18next'
import { ESelectionMode } from '@/types/app'
import { useRouter } from 'next/router'
import bem from '@/util/bem'
import TrashActions from './TrashActions'
import { TAlbum } from '@photon/schema'
import { useSelectionContext } from '@/providers'
import { DeleteControl, DownloadControl } from '@/components/controls'

type Props = {
    selected: TAlbum[]
}

export const BulkAlbumsActions = ({ selected }: Props) => {
    const { t } = useTranslation()
    const router = useRouter()
    const selection = useSelectionContext()

    if (selection.mode !== ESelectionMode.SELECT) {
        return <></>
    }

    const RegularActions = () => {
        return <>
            <DownloadControl
                elements={[...selection.selected]}
                shortcut={true}
            />
            <DeleteControl
                elements={[...selection.selected]}
                shortcut={true}
            />
        </>
    }

    const Actions = () => {
        if (router.pathname === '/trash') {
            return <TrashActions />
        }
        else {
            return <RegularActions />
        }
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
        <Actions />
    </div>
}
