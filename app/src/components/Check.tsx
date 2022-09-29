import Icon from '@mdi/react'
import * as Icons from '@mdi/js'
import { Ref, forwardRef } from 'react'

type Props = {
    checked: boolean
    ready: boolean
    onClick: () => void
    boxSize?: number
    hover?: boolean
    remove?: boolean
}

const Check = ({
    checked, ready, onClick, boxSize, hover, remove
}: Props, ref: Ref<unknown>) => {
    return <button
        className={`check${ready ? ' check--ready' : ''}${checked ? ' check--checked' : ''}${hover ? ' check--hover' : ''}${remove ? ' check--remove' : ''}`}
        onClick={onClick}
        ref={ref as Ref<HTMLButtonElement>}
        style={{
            width: `${boxSize || 24}px`,
            height: `${boxSize || 24}px`
        }}
    >
        <Icon
            className="check__icon check__icon--remove"
            path={Icons.mdiCloseCircle}
            size={1}
        />

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

export default forwardRef(Check)
