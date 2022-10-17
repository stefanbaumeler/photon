import Icon from '@mdi/react'
import * as Icons from '@mdi/js'
import { Ref, forwardRef } from 'react'
import bem from '@/util/bem'

type Props = {
    checked: boolean
    ready?: boolean
    onClick: () => void
    boxSize?: number
    hover?: boolean
    remove?: boolean
    dark?: boolean
}

const Check = ({
    dark, checked, ready, onClick, boxSize, hover, remove
}: Props, ref: Ref<unknown>) => {
    const classes = bem('check', [
        ['ready', ready],
        ['checked', checked],
        ['hover', hover],
        ['remove', remove],
        ['dark', dark]
    ])

    return <button
        className={classes}
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
