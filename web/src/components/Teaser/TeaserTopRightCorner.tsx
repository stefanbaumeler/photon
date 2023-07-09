import * as Icons from '@mdi/js'
import { useTeaserContext } from './TeaserContext'
import { Dropdown, Button } from '@/components'
import { useTranslation } from 'react-i18next'
import { ETrans } from '@/types/translations'
import useDeleteAlbumDialog from '@/dialogs/delete-album'
import { useState } from 'react'
import { TVideoMeta } from '@photon/schema'
import { secondsToTime } from '@/util/date'
import Icon from '@mdi/react'
import { isMedium } from '@/util/is'
import useDownload from '@/hooks/download'

export const TeaserTopRightCorner = () => {
    const { element } = useTeaserContext()
    const { t } = useTranslation()

    const [moreActive, setMoreActive] = useState(false)

    const download = useDownload(isMedium(element) ? [] : element.media.map(({ id }) => id))

    const deleteAlbumDialog = useDeleteAlbumDialog(element.id)

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
        {
            testId: 'album-delete',
            label: t(ETrans.DELETE_THING, {
                thing: t(ETrans.ALBUM)
            }),
            callback: deleteAlbumDialog
        },
        {
            label: t(ETrans.DOWNLOAD_THING, {
                thing: t(ETrans.ALBUM)
            }),
            callback: download
        }
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
