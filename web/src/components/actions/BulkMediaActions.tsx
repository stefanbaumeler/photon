import * as Icons from '@mdi/js'
import { Dropdown, Button } from '@/components'
import { useState } from 'react'
import { useSelectionContext } from '@/providers'
import { ETrans } from '@/types/translations'
import { useTranslation } from 'react-i18next'
import { ESelectionMode } from '@/types/app'
import { useRouter } from 'next/router'
import bem from '../../util/bem'
import TrashActions from './TrashActions'
import { TMedium } from '@photon/schema'
import { FavoriteControl, ArchiveControl, DeleteControl, DownloadControl, AddToControl } from '@/components/controls'

type Props = {
    selected: TMedium[]
}

export const BulkMediaActions = ({ selected }: Props) => {
    const { t } = useTranslation()
    const router = useRouter()

    const selection = useSelectionContext()

    const inactive = selection.mode !== ESelectionMode.SELECT

    const [moreActive, setMoreActive] = useState(false)

    const hideDropdown = () => {
        setMoreActive(false)
    }

    if (inactive) {
        return <></>
    }

    const moreItems = [
        <ArchiveControl
            dropdown={true}
            media={selected}
            shortcut={true}
            callback={hideDropdown}
            key={0}
        />,
        <FavoriteControl
            dropdown={true}
            media={selected}
            shortcut={true}
            callback={hideDropdown}
            key={1}
        />
    ]

    const RegularActions = () => {
        return <>
            <AddToControl media={selected} />
            <DownloadControl
                elements={selected}
                shortcut={true}
            />
            <DeleteControl
                elements={selected}
                shortcut={true}
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
