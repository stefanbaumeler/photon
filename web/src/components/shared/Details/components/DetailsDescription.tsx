import { useTranslation } from 'react-i18next'
import { useEffect, useRef, useState } from 'react'
import { ETrans } from '@/types/translations'
import { useUpdateMedium } from '@/hooks'
import { useMediumFromRouter } from '@/hooks/useMediumFromRouter'

export const DetailsDescription = () => {
    const { t } = useTranslation()
    const {
        id, medium
    } = useMediumFromRouter()

    const descriptionEl = useRef<HTMLTextAreaElement>(null)

    const [description, setDescription] = useState(medium?.description ?? '')

    const updateMedium = useUpdateMedium(description, id)

    useEffect(() => {
        setDescription(medium?.description ?? '')
    }, [medium?.description])

    const onChange = () => {
        setDescription(descriptionEl.current?.value ?? '')
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
