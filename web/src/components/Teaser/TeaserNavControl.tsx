import * as Icons from '@mdi/js'
import { useTeaserContext } from './TeaserContext'
import { Dropdown, Button } from '@/components'
import { useState } from 'react'
import { DeleteControl } from '@/components/controls'

export const TeaserNavControl = () => {
    const { id } = useTeaserContext()

    const [moreActive, setMoreActive] = useState(false)

    const moreItems = [
        <DeleteControl
            dropdown={true}
            callback={() => setMoreActive(false)}
            elements={[id]}
            key={0}
        />
        // <DownloadControl
        //     dropdown={true}
        //     callback={() => setMoreActive(false)}
        //     elements={element.media.filter((medium) => medium.status === EMediumStatus.ALL)}
        //     key={1}
        // />
    ]

    return <div className="teaser__nav">
        <Dropdown
            items={moreItems}
            active={moreActive}
            onClickOutside={() => setMoreActive(false)}
            smallButton={true}
        >
            <Button
                testId="album-controls"
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
