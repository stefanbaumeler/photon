import { useTeaserContext } from './TeaserContext'
import { ETrans } from '@/types/translations'
import { useTranslation } from 'react-i18next'
import { isAlbum } from '@/util/is'
import { EMediumStatus } from '@/types/app'

export const TeaserContent = () => {
    const { element } = useTeaserContext()
    const { t } = useTranslation()

    if (!isAlbum(element)) {
        return <></>
    }

    const Count = () => {
        const count = element.media.filter((el) => el.status === EMediumStatus.ALL).length

        return <span
            className="teaser__count"
            data-testid="album-teaser-count"
        >
            {`${count} `}
            {t(ETrans.ELEMENT, {
                count: count
            })}
        </span>
    }

    return <div className="teaser__content">
        <span
            data-testid="album-teaser-title"
            className="teaser__title"
        >
            {element.title || t(ETrans.UNTITLED)}
        </span>
        <div className="teaser__misc">
            {/*<Count />*/}
        </div>
    </div>
}
