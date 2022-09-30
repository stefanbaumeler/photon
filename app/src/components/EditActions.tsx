import * as Icons from '@mdi/js'
import { IconButton } from '@/components'
import { ETrans } from '@/types/translations'
import { useTranslation } from 'react-i18next'
import { ESelectionMode } from '@/types/app'
import { useContext, useEffect, useState } from 'react'
import { SelectionContext } from '@/providers'
import { useRemoveFromAlbum } from '@/types/api'
import { useRouter } from 'next/router'

const BulkActions = () => {
    const { t } = useTranslation()
    const router = useRouter()
    const id = Array.isArray(router.query.id) ? router.query.id.join('') : router.query.id

    const selection = useContext(SelectionContext)
    const [confirmed, setConfirmed] = useState(false)

    const [removeFromAlbum] = useRemoveFromAlbum({
        variables: {
            idAlbum: `${id}`,
            media: Array.from(selection.selected).map((s) => s.id)
        }
    })

    useEffect(() => {
        if (confirmed) {
            setConfirmed(false)
            removeFromAlbum()
            selection.clear()
        }
    }, [confirmed])

    const save = () => {
        setConfirmed(true)
    }

    const discard = () => {
        selection.setMode(ESelectionMode.SELECT)
        selection.clear()
    }

    if (selection.mode !== ESelectionMode.DELETE) {
        return <></>
    }

    return <div className="bulk-actions">
        <IconButton
            hint={t(ETrans.SAVE)}
            icon={Icons.mdiCheck}
            onClick={save}
        />
        <IconButton
            hint={t(ETrans.DISCARD)}
            onClick={discard}
            external={true}
            icon={Icons.mdiClose}
        />
    </div>
}

export default BulkActions
