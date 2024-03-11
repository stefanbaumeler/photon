import * as Icons from '@mdi/js'
import { secondsToTime } from '@/util/date'
import Icon from '@mdi/react'

type Props = {
    duration: number
}
export const TeaserDurationControl = ({ duration } : Props) => {
    const seconds = secondsToTime(duration)
    return <div className="teaser__nav">
        {seconds}
        <Icon
            path={Icons.mdiPlayCircleOutline}
            size={.75}
        />
    </div>
}
