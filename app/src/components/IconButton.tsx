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
    href?: string
    white?: boolean
    icon: string
    solid?: boolean
}

const IconButton = ({
    onClick, hint, hintPlacement, href, white = false, icon, solid = false
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

    const linkClasses = bem('button', [
        ['white', white],
        ['solid', solid]
    ])

    const ButtonOrLink = ({ children }: { children: ReactElement }, ref: Ref<unknown>) => {
        if (href) {
            return <Link
                href={href}
                onClick={onClick}
            >
                <a
                    className={linkClasses}
                    ref={ref as Ref<HTMLAnchorElement>}
                >
                    {children}
                </a>
            </Link>
        }

        return <button
            ref={ref as Ref<HTMLButtonElement>}
            className={linkClasses}
            onClick={onClick}
        >
            {children}
        </button>
    }

    const ButtonOrLinkWithRef = forwardRef(ButtonOrLink)

    return <ConditionalTip>
        <ButtonOrLinkWithRef>
            <Icon
                path={icon}
                size={1}
            />
        </ButtonOrLinkWithRef>
    </ConditionalTip>
}

export default IconButton
