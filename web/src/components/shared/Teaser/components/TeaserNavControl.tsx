import * as Icons from '@mdi/js'
import { useTeaserContext } from '..'
import { Dropdown, Button } from '@/components'
import { useState } from 'react'
import { ArchiveControl,
    MoveToTrashControl,
    DownloadMediaControl,
    FavoriteControl,
    RotateControl } from '@/components/controls'
import { useRouter } from 'next/router'
import { RestoreControl } from '@/components/controls/RestoreControl'
import { DeleteControl } from '@/components/controls/DeleteControl'

type Props = {
    stack?: string[]
    album?: boolean
}

export const TeaserNavControl = ({
    stack, album = false
}: Props) => {
    const { id } = useTeaserContext()
    const router = useRouter()
    const [moreActive, setMoreActive] = useState(false)
    const isTrash = router.pathname === '/trash'

    const moreItems = []

    if (!album) {
        moreItems.push(<RotateControl
            dropdown
            callback={() => setMoreActive(false)}
        />)

        if (!isTrash) {
            moreItems.push(<ArchiveControl
                dropdown
                media={stack ?? [id]}
                callback={() => setMoreActive(false)}
            />)
            moreItems.push(<FavoriteControl
                dropdown
                media={stack ?? [id]}
                callback={() => setMoreActive(false)}
            />)
        }
    }

    moreItems.push(<DownloadMediaControl
        dropdown
        callback={() => setMoreActive(false)}
        elements={stack ?? [id]}
        key={1}
    />)

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
