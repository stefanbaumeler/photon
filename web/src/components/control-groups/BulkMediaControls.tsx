import * as Icons from '@mdi/js'
import { useState } from 'react'
import { ETrans } from '@/types/translations'
import { useTranslation } from 'react-i18next'
import { usePathname } from 'next/navigation'
import bem from '@/util/bem'
import { useSelectionContext } from '@/providers/SelectionProvider'
import { TrashControls } from '@/components/control-groups/TrashControls'
import { Dropdown } from '@/components/shared/Dropdown'
import { Button } from '@/components/shared/Button'
import { ArchiveControl } from '@/components/controls/ArchiveControl'
import { FavoriteControl } from '@/components/controls/FavoriteControl'
import { AddToControl } from '@/components/controls/AddToControl'
import { DownloadMediaControl } from '@/components/controls/DownloadMediaControl'
import { MoveToTrashControl } from '@/components/controls/MoveToTrashControl'

export const BulkMediaControls = () => {
    const { t } = useTranslation()
    const pathname = usePathname()
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
        {pathname === '/trash' ? <TrashControls /> : <>
            <AddToControl />
            <DownloadMediaControl
                shortcut
            />
            <MoveToTrashControl
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
