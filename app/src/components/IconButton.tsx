import Icon from '@mdi/react'
import Tippy from '@tippyjs/react'
import { forwardRef, ReactElement, Ref } from 'react'
import Link from 'next/link'

type Props = {
    onClick?: () => void
    hint?: string
    href?: string
    white?: boolean
    icon: string
    external?: boolean
    download?: string
}

const IconButton = ({
    onClick, hint, href, white, icon, external, download
}: Props) => {
    const ConditionalTip = ({ children }: { children: ReactElement }) => {
        if (hint) {
            return <Tippy
                content={hint}
            >
                {children}
            </Tippy>
        }

        return <>
            {children}
        </>
    }

    const ButtonOrLink = ({ children }: { children: ReactElement }, ref: Ref<unknown>) => {
        if (href) {
            if (external) {
                return <a
                    ref={ref as Ref<HTMLAnchorElement>}
                    href={href}
                    className={`button${white ? ' button--white' : ''}`}
                    onClick={onClick}
                    target="_blank"
                    rel="noreferrer"
                    download={download}
                >
                    {children}
                </a>
            }

            return <Link
                ref={ref as Ref<HTMLAnchorElement>}
                href={href}
                className={`button${white ? ' button--white' : ''}`}
                onClick={onClick}
            >
                {children}
            </Link>
        }

        return <button
            ref={ref as Ref<HTMLButtonElement>}
            className={`button${white ? ' button--white' : ''}`}
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
