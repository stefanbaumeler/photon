import { useTeaserContext } from './TeaserContext'
import { ETrans } from 'web/src/types/translations'
import { useTranslation } from 'react-i18next'
import { isAlbum } from 'web/src/util/is'

export const TeaserContent = () => {
    const { element } = useTeaserContext()
    const { t } = useTranslation()

    if (!isAlbum(element)) {
        return <></>
    }

    const Count = () => {
        return <span
            className="teaser__count"
            data-testid="album-teaser-count"
        >
            {`${element.albumMedia.length} `}
            {t(ETrans.ELEMENT, {
                count: element.albumMedia.length
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
            <Count />
        </div>
    </div>
}
