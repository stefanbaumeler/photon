import { Button } from '@/components/shared/Button'
import * as Icons from '@mdi/js'
import { Detail } from '@/components/shared/Detail'
import { formatDate, getRelativeTime } from '@/util/date'
import { EDateFormat } from '@/types/app'
import { TQMedium } from '@photon/schema/dist/server'
import { InfobarDescription } from '@/components/shared/Infobar/components/InfobarDescription'
import { InfobarAlbums } from '@/components/shared/Infobar/components/InfobarAlbums'
import { InfobarSection } from '@/components/shared/Infobar/components/InfobarSection'
import { InfobarOwner } from '@/components/shared/Infobar/components/InfobarOwner'
import { InfobarShares } from '@/components/shared/Infobar/components/InfobarShares'
import { InfobarMap } from '@/components/shared/Infobar/components/InfobarMap'
import { InfobarImageMeta } from '@/components/shared/Infobar/components/InfobarImageMeta'
import { InfobarVideoMeta } from '@/components/shared/Infobar/components/InfobarVideoMeta'
import { InfobarHideButton } from '@/components/shared/Infobar/components/InfobarHideButton'

type Props = {
    medium: TQMedium['medium']
}
export const Infobar = ({ medium }: Props) => {
    return <aside
        data-testid="infobar"
        className="infobar"
    >
        <div className="toolbar">
            <div className="toolbar__section toolbar__section--left">
                <InfobarHideButton />
            </div>
        </div>
        {<div className="infobar__content">
            <InfobarDescription />
            <InfobarAlbums />
            <InfobarSection title={'Details'}>
                {medium.dateTaken ? <Detail
                    icon={Icons.mdiCalendar}
                    title={formatDate(medium.dateTaken, EDateFormat.LONG)}
                    values={getRelativeTime(medium.dateTaken)}
                /> : null}
                {medium.mimetype.startsWith('image') ? <InfobarImageMeta medium={medium} /> : <InfobarVideoMeta />}
            </InfobarSection>
            <InfobarOwner />
            <InfobarShares />
            <InfobarMap />
        </div>}
    </aside>
}
