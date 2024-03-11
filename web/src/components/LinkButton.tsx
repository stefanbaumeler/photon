import { forwardRef, ReactElement, Ref } from 'react'
import Link from 'next/link'
import { Placement } from 'tippy.js'
import { Tooltip } from '@/components/Tooltip'

type Props = {
    onClick?: () => void
    hint?: string
    hintPlacement?: Placement
    label?: string
    prefix?: string
    suffix?: string
    href?: string
    testId?: string
}

export const LinkButton = ({
    onClick, hint, hintPlacement, label, prefix, suffix, href, testId
}: Props) => {
    const linkClasses = 'link-button__link'

    const ButtonOrLink = ({ children }: { children: ReactElement }, ref: Ref<unknown>) => {
        return href ? <Link
            href={href}
            onClick={onClick}
            className={linkClasses}
            ref={ref as Ref<HTMLAnchorElement>}
            data-testid={testId}
        >
            {children}
        </Link> : <button
            ref={ref as Ref<HTMLButtonElement>}
            className={linkClasses}
            onClick={onClick}
            data-testid={testId}
        >
            {children}
        </button>
    }

    const ButtonOrLinkWithRef = forwardRef(ButtonOrLink)

    return <Tooltip
        hint={hint}
        placement={hintPlacement}
    >
        <div className="link-button">
            {prefix ? <span>
                {`${prefix} `}
            </span> : null}
            <ButtonOrLinkWithRef>
                <>
                    {label}
                </>
            </ButtonOrLinkWithRef>
            {suffix ? <span>
                {`${suffix} `}
            </span> : null}
        </div>
    </Tooltip>
}
