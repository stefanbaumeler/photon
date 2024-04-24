import * as Icons from '@mdi/js'
import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { RestoreControl } from '@/components/controls/RestoreControl'
import { DeleteControl } from '@/components/controls/DeleteControl'
import { RotateControl } from '@/components/controls/RotateControl'
import { useTeaserContext } from '@/components/shared/Teaser/components/TeaserContext'
import { ArchiveControl } from '@/components/controls/ArchiveControl'
import { FavoriteControl } from '@/components/controls/FavoriteControl'
import { DownloadMediaControl } from '@/components/controls/DownloadMediaControl'
import { MoveToTrashControl } from '@/components/controls/MoveToTrashControl'
import { Dropdown } from '@/components/shared/Dropdown'
import { Button } from '@/components/shared/Button'

type Props = {
    stack?: string[]
    album?: boolean
}

export const TeaserNavControl = ({
    stack, album = false
}: Props) => {
    const { id } = useTeaserContext()
    const pathname = usePathname()
    const [moreActive, setMoreActive] = useState(false)
    const isTrash = pathname === '/trash'

    const moreItems = []

    moreItems.push(<DownloadMediaControl
        dropdown
        callback={() => setMoreActive(false)}
        elements={stack ?? [id]}
        key={1}
    />)

    if (!album) {
        if (!isTrash) {
            moreItems.push(<FavoriteControl
                dropdown
                media={stack ?? [id]}
                callback={() => setMoreActive(false)}
            />)
            moreItems.push(<ArchiveControl
                dropdown
                media={stack ?? [id]}
                callback={() => setMoreActive(false)}
            />)
        }

        moreItems.push(<RotateControl
            medium={id}
            dropdown
            callback={() => setMoreActive(false)}
        />)
    }

    if (isTrash) {
        moreItems.push(<RestoreControl
            dropdown
            media={stack ?? [id]}
            callback={() => setMoreActive(false)}
        />)
        moreItems.push(<DeleteControl
            dropdown
            media={stack ?? [id]}
            callback={() => setMoreActive(false)}
        />)
    }
    else {
        moreItems.push(<MoveToTrashControl
            dropdown
            callback={() => setMoreActive(false)}
            elements={[id]}
            key={0}
        />)
    }

    return <div className="teaser__nav">
        <Dropdown
            items={moreItems}
            active={moreActive}
            onClickOutside={() => setMoreActive(false)}
            smallButton
        >
            <Button
                testId="teaser-nav"
                icon={Icons.mdiDotsVertical}
                onClick={() => setMoreActive(!moreActive)}
                appearance={{
                    text: 'light',
                    size: 'small'
                }}
            />
        </Dropdown>
    </div>
}
