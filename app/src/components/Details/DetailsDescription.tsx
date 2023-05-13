import { useDetailsContext } from '@/providers'
import { useTranslation } from 'react-i18next'
import { ETrans } from '@/types/translations'

export const DetailsDescription = () => {
    const details = useDetailsContext()
    const { t } = useTranslation()

    return <div className="details__description-container">
        <textarea
            className="details__description"
            placeholder={t(ETrans.ADD_DESCRIPTION)}
        >
            {details.medium.description}
        </textarea>
    </div>
}
