import { TCover } from '@/types/app'
import Link from 'next/link'
import { DetailContents } from '.'

type Props = {
    icon: string | TCover
    title: string
    values?: string | string[]
    testId?: string
    href?: string
    onClick?: () => void
}

export const Detail = ({
    testId, href, onClick, ...rest
}: Props) => {
    return href ? <Link
        href={href}
        className="detail"
        data-testid={testId}
        onClick={onClick}
    >
        <DetailContents{...rest} />
    </Link> : <div
        className="detail"
        data-testid={testId}
        onClick={onClick}
    >
        <DetailContents{...rest} />
    </div>
}
