import Icon from '@mdi/react'
import Tippy from '@tippyjs/react'
import { forwardRef, ReactElement, Ref } from 'react'
import Link from 'next/link'
import { Placement } from 'tippy.js'
import bem from '@/util/bem'

type Props = {
    onClick?: () => void
    hint?: string
    hintPlacement?: Placement
    label?: string
    href?: string
    white?: boolean
    icon: string
    solid?: boolean
    cy?: string
    small?: boolean
}

export const IconButton = ({
    onClick, hint, hintPlacement, label, href, white = false, icon, solid = false, cy, small = false
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

    const linkClasses = bem('icon-button', [
        ['white', white],
        ['solid', solid],
        ['small', small],
        ['label', !!label?.length]
    ])

    const ButtonOrLink = ({ children }: { children: ReactElement }, ref: Ref<unknown>) => {
        if (href) {
            return <Link
                href={href}
                onClick={onClick}
                className={linkClasses}
                ref={ref as Ref<HTMLAnchorElement>}
                data-testid={cy}
            >
                {children}
            </Link>
        }

        return <button
            ref={ref as Ref<HTMLButtonElement>}
            className={linkClasses}
            onClick={onClick}
            data-testid={cy}
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
                {label}
            </>
        </ButtonOrLinkWithRef>
    </ConditionalTip>
}
