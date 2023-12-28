import * as Icons from '@mdi/js'
import { useTeaserContext } from './TeaserContext'
import { Dropdown, Button } from '@/components'
import { useState } from 'react'
import { TVideoMeta } from '@photon/schema'
import { secondsToTime } from '@/util/date'
import Icon from '@mdi/react'
import { isMedium } from '@/util/is'
import { DeleteControl, DownloadControl } from '@/components/controls'
import { EMediumStatus } from '@/types/app'

export const TeaserTopRightCorner = () => {
    const { element } = useTeaserContext()

    const [moreActive, setMoreActive] = useState(false)

    if (isMedium(element)) {
        if (element.mimetype.startsWith('video')) {
            const meta = element.meta as TVideoMeta
            const seconds = secondsToTime(meta.duration)
            return <div className="teaser__nav">
                {seconds}
                <Icon
                    path={Icons.mdiPlayCircleOutline}
                    size={.75}
                />
            </div>
        }

        return <></>
    }

    const moreItems = [
        <DeleteControl
            dropdown={true}
            callback={() => setMoreActive(false)}
            elements={[element]}
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
