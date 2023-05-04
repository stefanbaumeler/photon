import * as Icons from '@mdi/js'
import { IconButton } from '../'
import { useState } from 'react'
import { ETrans } from '@/types/translations'
import { useTranslation } from 'react-i18next'
import { ESelectionMode } from '@/types/app'
import { useRouter } from 'next/router'
import bem from '../../util/bem'
import TrashActions from './TrashActions'
import useDownload  from '../../hooks/download'
import { TAlbum } from '@photon/schema'
import useDeleteAlbumDialog from '@/dialogs/delete-album'
import { useSelectionContext } from '@/providers'

type Props = {
    selected: TAlbum[]
}

export const BulkAlbumsActions = ({ selected }: Props) => {
    const { t } = useTranslation()
    const router = useRouter()
    const selection = useSelectionContext()

    const deleteAlbumDialog = useDeleteAlbumDialog([...selection.selected].map((element) => element.id))

    const download = useDownload()

    if (selection.mode !== ESelectionMode.SELECT) {
        return <></>
    }

    const RegularActions = () => {
        return <>
            <IconButton
                hint={t(ETrans.DOWNLOAD)}
                icon={Icons.mdiTrayArrowDown}
                onClick={download}
            />
            <IconButton
                testId="move-to-trash"
                hint={t(ETrans.DELETE_THING, {
                    thing: t(ETrans.ALBUM_PLURAL)
                })}
                onClick={deleteAlbumDialog}
                icon={Icons.mdiTrashCanOutline}
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
