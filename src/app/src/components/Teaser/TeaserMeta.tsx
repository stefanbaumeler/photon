import { TVideoMeta } from '@/api'
import { secondsToTime } from '@/util/date'
import Icon from '@mdi/react'
import * as Icons from '@mdi/js'
import { useTeaserContext } from './TeaserContext'

const TeaserMeta = () => {
    const teaser = useTeaserContext()

    if (teaser.medium.mimetype.startsWith('video')) {
        const meta = teaser.medium.meta as TVideoMeta
        const seconds = secondsToTime(meta.duration)
        return <div className="teaser__meta">
            {seconds}
            <Icon
                path={Icons.mdiPlayCircleOutline}
                size={.75}
            />
        </div>
    }

    return <></>
}

export default TeaserMeta
