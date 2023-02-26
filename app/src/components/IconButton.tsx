import Icon from '@mdi/react'
import Tippy from '@tippyjs/react'
import { forwardRef, ReactElement, Ref } from 'react'
import Link from 'next/link'
import { Placement } from 'tippy.js'
import bem from '../util/bem'

type Props = {
    onClick?: () => void
    hint?: string
    hintPlacement?: Placement
    label?: string
    href?: string
    white?: boolean
    icon: string
    solid?: boolean
    testId?: string
    small?: boolean
    className?: string
    badge?: string
    badgePlacement?: 'below' | 'bottom-right'
}

export const IconButton = ({
    onClick, badge, badgePlacement, className, hint, hintPlacement, label, href, white = false, icon, solid = false, testId, small = false
}: Props) => {
    const ConditionalTip = ({ children }: { children: ReactElement }) => {
        if (hint) {
            return <Tippy
                content={hint}
                placement={hintPlacement}
            >
                {children}
            </Tippy>
        }

        return <>
            {children}
        </>
    }

    const localClasses = bem('icon-button', [
        ['white', white],
        ['solid', solid],
        ['small', small],
        ['label', !!label?.length]
    ])

    const classes = className ? `${localClasses} ${className}` : localClasses

    const Badge = () => {
        if (!badge) {
            return <></>
        }

        const badgeClasses = bem('icon-button__badge', [
            [badgePlacement, !!badgePlacement]
        ])

        return <span className={badgeClasses}>
            {badge}
        </span>
    }

    const ButtonOrLink = ({ children }: { children: ReactElement }, ref: Ref<unknown>) => {
        if (href) {
            return <Link
                href={href}
                onClick={onClick}
                className={classes}
                ref={ref as Ref<HTMLAnchorElement>}
                data-testid={testId}
            >
                {children}
            </Link>
        }

        return <button
            ref={ref as Ref<HTMLButtonElement>}
            className={classes}
            onClick={onClick}
            data-testid={testId}
        >
            {children}
        </button>
    }

    const ButtonOrLinkWithRef = forwardRef(ButtonOrLink)

    return <ConditionalTip>
        <ButtonOrLinkWithRef>
            <>
                <Icon
                    path={icon}
                    size={small ? .75 : 1}
                />
                <Badge />
                {label}
            </>
        </ButtonOrLinkWithRef>
    </ConditionalTip>
}
