import Icon from '@mdi/react'
import { ReactElement } from 'react'
import Link from 'next/link'
import { Placement } from 'tippy.js'
import bem from '@/util/bem'
import { ButtonBadge, ButtonTip } from '.'

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
    shortcut?: string
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
    suffix,
    shortcut
}: Props) => {
    const localClasses = appearance ? bem('button', [
        [`text-${appearance.text}`, !!appearance.text],
        [appearance.size, !!appearance.size],
        [appearance.type, !!appearance.type],
        ['square', appearance.shape === 'square']
    ]) : 'button'

    const classes = className ? `${localClasses} ${className}` : localClasses

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

    return <ButtonTip
        hint={hint}
        shortcut={shortcut}
    >
        <div className={classes}>
            {prefix ? <span className="button__prefix">
                {`${prefix} `}
            </span> : null}
            <ButtonOrLink>
                <>
                    {icon ? <Icon
                        path={typeof icon === 'string' ? icon : icon.path}
                        size={appearance?.size === 'small' ? .75 : 1}
                        className="button__icon"
                    /> : null}
                    {badge ? <ButtonBadge badge={badge} /> : null}
                    {label ? <span className="button__label">
                        {label}
                    </span> : null}
                </>
            </ButtonOrLink>
            {suffix ? <span className="button__suffix">
                {`${suffix} `}
            </span> : null}
        </div>
    </ButtonTip>
}
