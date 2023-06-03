import Icon from '@mdi/react'
import Tippy from '@tippyjs/react'
import { ReactElement } from 'react'
import Link from 'next/link'
import { Placement } from 'tippy.js'
import bem from '@/util/bem'

type Props = {
    onClick?: () => void
    label?: string
    href?: string
    icon?: {
        path: string
        placement: 'before' | 'after'
    } | string
    appearance?: {
        type?: 'primary' | 'secondary' | 'tertiary' | 'danger'
        text?: 'light' | 'dark' | 'danger'
        size?: 'small' | 'regular' | 'large'
        shape?: 'round' | 'square'
    }
    hint?: {
        label: string
        placement?: Placement
    } | string
    badge?: {
        label?: string
        placement?: 'below' | 'bottom-right'
    } | string
    testId?: string
    className?: string
    prefix?: string
    suffix?: string
}

export const Button = ({
    onClick,
    label,
    href,
    icon,
    appearance,
    hint,
    badge,
    testId,
    className,
    prefix,
    suffix
}: Props) => {
    const ConditionalTip = ({ children }: { children: ReactElement }) => {
        if (!hint) {
            return <>
                {children}
            </>
        }

        if (typeof hint === 'string') {
            return <Tippy
                content={hint}
            >
                {children}
            </Tippy>
        }

        return <Tippy
            content={hint.label}
            placement={hint.placement}
        >
            {children}
        </Tippy>
    }

    const localClasses = appearance ? bem('button', [
        [`text-${appearance.text}`, !!appearance.text],
        [appearance.size, !!appearance.size],
        [appearance.type, !!appearance.type],
        ['square', appearance.shape === 'square']
    ]) : 'button'

    const classes = className ? `${localClasses} ${className}` : localClasses

    const Badge = () => {
        if (!badge) {
            return <></>
        }

        if (typeof badge === 'string') {
            return <span className="button__badge">
                {badge}
            </span>
        }

        const badgeClasses = bem('button__badge', [
            [badge.placement, !!badge.placement]
        ])

        return <span className={badgeClasses}>
            {badge.label}
        </span>
    }

    const ButtonOrLink = ({ children }: { children: ReactElement }) => href ? <Link
        href={href}
        onClick={onClick}
        className="button__button"
        data-testid={testId}
    >
        {children}
    </Link> : <button
        className="button__button"
        onClick={onClick}
        data-testid={testId}
    >
        {children}
    </button>

    const ConditionalIcon = () => icon ? <Icon
        path={typeof icon === 'string' ? icon : icon.path}
        size={appearance?.size === 'small' ? .75 : 1}
        className="button__icon"
    /> : <></>

    const Prefix = () => prefix ? <span className="button__prefix">
        {`${prefix} `}
    </span> : <></>

    const Suffix = () => suffix ? <span className="button__suffix">
        {`${suffix} `}
    </span> : <></>

    const Label = () => label ? <span className="button__label">
        {label}
    </span> : <></>

    return <ConditionalTip>
        <div className={classes}>
            <Prefix />
            <ButtonOrLink>
                <>
                    <ConditionalIcon />
                    <Badge />
                    <Label />
                </>
            </ButtonOrLink>
            <Suffix />
        </div>
    </ConditionalTip>
}
