import Icon from '@mdi/react'
import * as Icons from '@mdi/js'
import { Ref, forwardRef } from 'react'
import bem from '../../util/bem'

type Props = {
    borderColor?: string
    backgroundColor?: string
    blankHoverColor?: string
    checked: boolean
    ready?: boolean
    onClick: () => void
    boxSize?: number
    iconSize?: number
    hover?: boolean
    remove?: boolean
    testId?: string
    round?: boolean
}

const CheckEl = ({
    borderColor = '#FFFFFF',
    backgroundColor = '#FFFFFF',
    blankHoverColor = '#FFFFFF',
    round = true,
    checked = false,
    boxSize = 24,
    iconSize = 1,
    ready, onClick, hover, remove, testId
}: Props, ref: Ref<unknown>) => {
    const classes = bem('check', [
        ['ready', ready],
        ['checked', checked],
        ['hover', hover],
        ['remove', remove],
        ['round', round]
    ])

    return <button
        className={classes}
        onClick={onClick}
        ref={ref as Ref<HTMLButtonElement>}
        data-testid={testId}
        style={{
            width: `${boxSize}px`,
            height: `${boxSize}px`,
            color: `${borderColor}`
        }}
    >
        <Icon
            className="check__icon check__icon--remove"
            path={round ? Icons.mdiCloseCircle : Icons.mdiClose}
            size={iconSize}
        />

        <Icon
            className="check__icon check__icon--mark"
            path={round ? Icons.mdiCheckboxBlankCircle : Icons.mdiCheckboxBlank}
            size={iconSize}
        />

        <Icon
            className="check__icon check__icon--background"
            path={round ? Icons.mdiCheckboxMarkedCircle : Icons.mdiCheckboxMarked}
            size={iconSize}
            style={checked ? {} : {
                color: `${backgroundColor}`
            }}
        />

        <Icon
            className="check__icon check__icon--blank"
            path={round ? Icons.mdiCheckboxBlankCircleOutline : Icons.mdiCheckboxBlankOutline}
            size={iconSize}
            style={{
                ['--blank-hover-color' as string]: `${blankHoverColor}`
            }}
        />
    </button>
}

export const Check = forwardRef(CheckEl)
