import Tippy from '@tippyjs/react'
import { forwardRef, ReactElement, Ref } from 'react'
import Link from 'next/link'
import { Placement } from 'tippy.js'

type Props = {
    onClick?: () => void
    hint?: string
    hintPlacement?: Placement
    label?: string
    href?: string
    cy?: string
}

export const Button = ({
    onClick, hint, hintPlacement, label, href, cy
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

    const linkClasses = 'button'

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
                {label}
            </>
        </ButtonOrLinkWithRef>
    </ConditionalTip>
}
