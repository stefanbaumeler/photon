import Icon from '@mdi/react'
import Tippy from '@tippyjs/react'
import { forwardRef, ReactElement, Ref } from 'react'
import Link from 'next/link'
import { Placement } from 'tippy.js'

type Props = {
    onClick?: () => void
    hint?: string
    hintPlacement?: Placement
    href?: string
    white?: boolean
    icon: string
    external?: boolean
    download?: string
    solid?: boolean
}

const IconButton = ({
    onClick, hint, hintPlacement, href, white, icon, external, download, solid
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

    const linkClasses = ['button']

    if (white) {
        linkClasses.push('button--white')
    }

    if (solid) {
        linkClasses.push('button--solid')
    }

    const ButtonOrLink = ({ children }: { children: ReactElement }, ref: Ref<unknown>) => {
        if (href) {
            if (external) {
                return <a
                    ref={ref as Ref<HTMLAnchorElement>}
                    href={href}
                    className={linkClasses.join(' ')}
                    onClick={onClick}
                    target="_blank"
                    rel="noreferrer"
                    download={download}
                >
                    {children}
                </a>
            }

            return <Link
                href={href}
                onClick={onClick}
            >
                <a
                    className={linkClasses.join(' ')}
                    ref={ref as Ref<HTMLAnchorElement>}
                >
                    {children}
                </a>
            </Link>
        }

        return <button
            ref={ref as Ref<HTMLButtonElement>}
            className={linkClasses.join(' ')}
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
