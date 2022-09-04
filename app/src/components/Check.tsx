import Icon from '@mdi/react'
import * as Icons from '@mdi/js'
import { TNav } from '@/types/app'

type Props = {
    checked: boolean
    ready: boolean
    onClick: () => void
}

const Check = ({
    checked, ready, onClick
}: Props) => {
    return <button
        className={`check${ready ? ' check--ready' : ''}${checked ? ' check--checked' : ''}`}
        onClick={onClick}
    >
        <Icon
            className="check__icon check__icon--background"
            path={Icons.mdiCheckboxBlankCircle}
            size={1}
        />

        <Icon
            className="check__icon check__icon--active"
            path={Icons.mdiCheckboxMarkedCircle}
            size={1}
        />

        <Icon
            className="check__icon check__icon--blank"
            path={Icons.mdiCheckboxBlankCircleOutline}
            size={1}
        />
    </button>
}

export default Check
