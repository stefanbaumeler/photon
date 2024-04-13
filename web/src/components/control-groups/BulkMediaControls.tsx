import * as Icons from '@mdi/js'
import { Dropdown, Button } from '@/components'
import { useState } from 'react'
import { useSelectionContext } from '@/providers'
import { ETrans } from '@/types/translations'
import { useTranslation } from 'react-i18next'
import { useRouter } from 'next/router'
import bem from '@/util/bem'
import { TrashControls } from '@/components/control-groups'
import { FavoriteControl, ArchiveControl, DeleteControl, AddToControl, DownloadMediaControl } from '@/components/controls'

export const BulkMediaControls = () => {
    const { t } = useTranslation()
    const router = useRouter()
    const selection = useSelectionContext()

    const selected = [...selection.selected]

    const [moreActive, setMoreActive] = useState(false)

    const moreItems = [
        <ArchiveControl
            dropdown
            media={selected}
            shortcut
            callback={() => setMoreActive(false)}
            key={0}
        />,
        <FavoriteControl
            dropdown
            media={selected}
            shortcut
            callback={() => setMoreActive(false)}
            key={1}
        />
    ]

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
        {router.pathname === '/trash' ? <TrashControls /> : <>
            <AddToControl />
            <DownloadMediaControl
                shortcut
            />
            <DeleteControl
                elements={selected}
                shortcut
            />
            <Dropdown
                items={moreItems}
                active={moreActive}
                onClickOutside={() => setMoreActive(false)}
            >
                <Button
                    testId="bulk-more"
                    hint={t(ETrans.MORE_OPTIONS)}
                    icon={Icons.mdiDotsVertical}
                    onClick={() => setMoreActive(!moreActive)}
                />
            </Dropdown>
        </>}
    </div>
}
