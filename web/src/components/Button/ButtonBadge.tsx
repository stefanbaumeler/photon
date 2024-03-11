import bem from '@/util/bem'

type Props = {
    badge: {
        label?: string
        placement?: 'below' | 'bottom-right'
    } | string
}
export const ButtonBadge = ({ badge } : Props) => {
    if (typeof badge === 'string') {
        return <span className="button__badge">
            {badge}
        </span>
    }

    const badgeClasses = bem('button__badge', [
        [badge.placement, !!badge.placement]
    ])

    return <span className={badgeClasses}>
        {badge.label}
    </span>
}
