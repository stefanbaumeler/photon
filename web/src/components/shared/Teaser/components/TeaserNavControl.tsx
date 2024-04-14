import * as Icons from '@mdi/js'
import { useTeaserContext } from '..'
import { Dropdown, Button } from '@/components'
import { useState } from 'react'
import { ArchiveControl,
    DeleteControl,
    DownloadMediaControl,
    FavoriteControl,
    RotateControl } from '@/components/controls'

type Props = {
    stack: string[]
    album?: boolean
}

export const TeaserNavControl = ({
    stack, album = false
}: Props) => {
    const { id } = useTeaserContext()

    const [moreActive, setMoreActive] = useState(false)

    const moreItems = [
        <DeleteControl
            dropdown
            callback={() => setMoreActive(false)}
            elements={[id]}
            key={0}
        />,
        <DownloadMediaControl
            dropdown
            callback={() => setMoreActive(false)}
            elements={stack ?? [id]}
            key={1}
        />
    ]

    if (!album) {
        moreItems.push(<RotateControl
            dropdown
            callback={() => setMoreActive(false)}
        />)
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
