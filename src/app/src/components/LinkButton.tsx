import Tippy from '@tippyjs/react'
import { forwardRef, ReactElement, Ref } from 'react'
import Link from 'next/link'
import { Placement } from 'tippy.js'

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

    const linkClasses = 'link-button__link'

    const ButtonOrLink = ({ children }: { children: ReactElement }, ref: Ref<unknown>) => {
        if (href) {
            return <Link
                href={href}
                onClick={onClick}
                className={linkClasses}
                ref={ref as Ref<HTMLAnchorElement>}
                data-testid={testId}
            >
                {children}
            </Link>
        }

        return <button
            ref={ref as Ref<HTMLButtonElement>}
            className={linkClasses}
            onClick={onClick}
            data-testid={testId}
        >
            {children}
        </button>
    }

    const ButtonOrLinkWithRef = forwardRef(ButtonOrLink)

    const Prefix = () => prefix ? <span>
        {`${prefix} `}
    </span> : <></>

    const Suffix = () => suffix ? <span>
        {`${suffix} `}
    </span> : <></>

    return <ConditionalTip>
        <div className="link-button">
            <Prefix />
            <ButtonOrLinkWithRef>
                <>
                    {label}
                </>
            </ButtonOrLinkWithRef>
            <Suffix />
        </div>
    </ConditionalTip>
}
