'use client'

import { useTranslation } from 'react-i18next'
import { useEffect, useRef, useState } from 'react'
import { ETrans } from '@/types/translations'
import { useMediumFromRouter } from '@/hooks/useMediumFromRouter'
import { useUpdateMedium } from '@/hooks/useUpdateMedium'
export const InfobarDescription = () => {
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

    return <div className="infobar__description-container">
        <textarea
            ref={descriptionEl}
            className="infobar__description"
            placeholder={t(ETrans.ADD_DESCRIPTION)}
            value={description}
            onChange={onChange}
            onBlur={onBlur}
        />
    </div>
}
