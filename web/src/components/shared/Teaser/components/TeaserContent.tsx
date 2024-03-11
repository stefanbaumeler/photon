import { ETrans } from '@/types/translations'
import { useTranslation } from 'react-i18next'

type Props = {
    title?: string
}
export const TeaserContent = ({ title }: Props) => {
    const { t } = useTranslation()

    // const Count = () => {
    //     return <span
    //         className="teaser__count"
    //         data-testid="album-teaser-count"
    //     >
    //         {`${count} `}
    //         {t(ETrans.ELEMENT, {
    //             count: count
    //         })}
    //     </span>
    // }

    return <div className="teaser__content">
        <span
            data-testid="album-teaser-title"
            className="teaser__title"
        >
            {title || t(ETrans.UNTITLED)}
        </span>
        <div className="teaser__misc">
            {/*<Count />*/}
        </div>
    </div>
}
