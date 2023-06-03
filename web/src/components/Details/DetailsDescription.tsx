import { useDetailsContext } from '@/providers'
import { useTranslation } from 'react-i18next'
import { useState } from 'react'
import { ETrans } from '@/types/translations'

export const DetailsDescription = () => {
    const details = useDetailsContext()
    const { t } = useTranslation()

    const [description, setDescription] = useState(details.medium.description)

    const onChange = () => {
        setDescription(description)
    }

    return <div className="details__description-container">
        <textarea
            className="details__description"
            placeholder={t(ETrans.ADD_DESCRIPTION)}
            defaultValue={description}
            onChange={onChange}
        />
    </div>
}
