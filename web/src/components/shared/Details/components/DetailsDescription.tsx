import { useDetailsContext } from '@/providers'
import { useTranslation } from 'react-i18next'
import { useEffect, useRef, useState } from 'react'
import { ETrans } from '@/types/translations'
import { useUpdateMedium } from '@/hooks'

export const DetailsDescription = () => {
    const details = useDetailsContext()
    const { t } = useTranslation()

    const descriptionEl = useRef(null)

    const [description, setDescription] = useState(details.medium.description || '')

    const updateMedium = useUpdateMedium(details.medium.id, description)

    useEffect(() => {
        setDescription(details.medium.description || '')
    }, [details.medium])

    const onChange = () => {
        setDescription(descriptionEl.current.value)
    }

    const onBlur = () => {
        updateMedium()
    }

    return <div className="details__description-container">
        <textarea
            ref={descriptionEl}
            className="details__description"
            placeholder={t(ETrans.ADD_DESCRIPTION)}
            value={description}
            onChange={onChange}
            onBlur={onBlur}
        />
    </div>
}
