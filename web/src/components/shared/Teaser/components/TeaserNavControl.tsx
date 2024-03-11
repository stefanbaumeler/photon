import * as Icons from '@mdi/js'
import { useTeaserContext } from '..'
import { Dropdown, Button } from '@/components'
import { useState } from 'react'
import { DeleteControl, DownloadMediaControl } from '@/components/controls'

type Props = {
    stack: string[]
}

export const TeaserNavControl = ({ stack }: Props) => {
    const { id } = useTeaserContext()

    const [moreActive, setMoreActive] = useState(false)

    const moreItems = [
        <DeleteControl
            dropdown={true}
            callback={() => setMoreActive(false)}
            elements={[id]}
            key={0}
        />,
        <DownloadMediaControl
            dropdown={true}
            callback={() => setMoreActive(false)}
            elements={stack ?? [id]}
            key={1}
        />
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
