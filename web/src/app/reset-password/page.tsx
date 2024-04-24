'use client'

import { useTranslation } from 'react-i18next'
import { ETrans } from '@/types/translations'
import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { Brand } from '@/components/shared/Brand'
import { TextBox } from '@/components/shared/TextBox'
import { Button } from '@/components/shared/Button'
import { LinkButton } from '@/components/shared/LinkButton'

enum EResetFormMode {
    DEFAULT,
    SENT,
    SET,
    DONE
}

const ResetPasswordPage = () => {
    const { t } = useTranslation()

    const params = useParams()
    const id = params.id

    useEffect(() => {
        if (id) {
            setResetFormMode(EResetFormMode.SET)
        }
    }, [id])

    const [resetFormMode, setResetFormMode] = useState<EResetFormMode>(id ? EResetFormMode.SET : EResetFormMode.DEFAULT)

    const submit = () => {
        setResetFormMode(resetFormMode === EResetFormMode.DEFAULT ? EResetFormMode.SENT : EResetFormMode.DONE)
    }

    let label = t(ETrans.REQUEST_RESET_LINK)
    let hint = t(ETrans.RESET_PASSWORD_HINT)

    if (resetFormMode === EResetFormMode.SET) {
        label = t(ETrans.SAVE)
        hint = t(ETrans.RESET_PASSWORD_SET)
    }

    if (resetFormMode === EResetFormMode.DONE) {
        label = t(ETrans.BACK_TO_LOGIN)
        hint = t(ETrans.RESET_PASSWORD_CONFIRMED)
    }

    if (resetFormMode === EResetFormMode.SENT) {
        hint = t(ETrans.RESET_PASSWORD_SENT)
    }
    return <section>
        <div className="login login--reset">
            <div className="login__container">
                <div className="login__content-container">
                    <div className="login__content">
                        <div className="login__header">
                            <Brand />
                            <h1 className="login__title">
                                {t(ETrans.RESET_PASSWORD)}
                            </h1>
                            <div className="login__hint">
                                {hint}
                            </div>
                        </div>
                        <div className="login__content">
                            {resetFormMode === EResetFormMode.DEFAULT ? <>
                                <TextBox
                                    id="mail"
                                    label={t(ETrans.MAIL)}
                                />
                            </> : null}
                            {resetFormMode === EResetFormMode.SET ? <>
                                <TextBox
                                    type="password"
                                    id="password"
                                    label={t(ETrans.PASSWORD)}
                                />
                                <TextBox
                                    type="password"
                                    id="repeat-password"
                                    label={t(ETrans.REPEAT_PASSWORD)}
                                />
                            </> : null}
                        </div>
                        {resetFormMode === EResetFormMode.SENT ? null : <div className="login__footer">
                            {resetFormMode === EResetFormMode.DONE ? <Button
                                href={'/login'}
                                label={label}
                            /> : <>
                                <LinkButton
                                    href={'/login'}
                                    label={t(ETrans.CANCEL)}
                                />
                                <Button
                                    onClick={submit}
                                    label={label}
                                />
                            </>}
                        </div>}
                    </div>
                </div>
            </div>
        </div>
    </section>
}

export default ResetPasswordPage
