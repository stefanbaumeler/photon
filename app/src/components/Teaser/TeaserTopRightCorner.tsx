import * as Icons from '@mdi/js'
import { useTeaserContext } from './TeaserContext'
import { Dropdown, IconButton } from '@/components'
import { useTranslation } from 'react-i18next'
import { ETrans } from '@/types/translations'
import useDeleteAlbumDialog from '@/dialogs/delete-album'
import { useState } from 'react'
import { TVideoMeta } from '@photon/schema'
import { secondsToTime } from '@/util/date'
import Icon from '@mdi/react'
import { isMedium } from '@/util/is'

export const TeaserTopRightCorner = () => {
    const { element } = useTeaserContext()
    const { t } = useTranslation()

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

    const [moreActive, setMoreActive] = useState(false)

    const deleteAlbumDialog = useDeleteAlbumDialog(element.id)

    const moreItems = [
        {
            testId: 'album-delete',
            label: t(ETrans.DELETE_THING, {
                thing: t(ETrans.ALBUM)
            }),
            callback: deleteAlbumDialog
        }
    ]

    return <div className="teaser__nav">
        <Dropdown
            items={moreItems}
            active={moreActive}
            onClickOutside={() => setMoreActive(false)}
            smallButton={true}
        >
            <IconButton
                testId="album-controls"
                icon={Icons.mdiDotsVertical}
                white={true}
                onClick={() => setMoreActive(!moreActive)}
                small={true}
            />
        </Dropdown>
    </div>
}
