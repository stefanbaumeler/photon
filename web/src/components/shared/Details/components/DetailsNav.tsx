'use client'

import Icon from '@mdi/react'
import * as Icons from '@mdi/js'
import Link from 'next/link'
import { useSearchContext } from '@/providers/SearchProvider'
import { useHotkey } from '@/hooks/hotkey'
import { useRouter } from 'next/navigation'

type Props = {
    medium?: string
}

export const DetailsNav = ({ medium }: Props) => {
    const router = useRouter()
    const { hits: media } = useSearchContext()

    const index = media.map(({ id }) => id).indexOf(medium ?? '')
    const prev = media[index - 1]?.id
    const next = media[index + 1]?.id

    useHotkey({
        key: 'ArrowLeft',
        callback: () => {
            if (prev) {
                router.push(prev)
            }
        }
    })

    useHotkey({
        key: 'ArrowRight',
        callback: () => {
            if (next) {
                router.push(next)
            }
        }
    })

    return <div className="details__nav">
        {prev ? <Link
            href={prev}
            data-testid="prev-medium"
            className="details__button details__button--prev"
        >
            <div className="details__button-icon">
                <Icon
                    path={Icons.mdiChevronLeft}
                    size={1.75}
                />
            </div>
        </Link> : null}
        { next ? <Link
            href={next}
            data-testid="next-medium"
            className="details__button details__button--next"
        >
            <div className="details__button-icon">
                <Icon
                    path={Icons.mdiChevronRight}
                    size={1.75}
                />
            </div>
        </Link> : null}
    </div>
}
