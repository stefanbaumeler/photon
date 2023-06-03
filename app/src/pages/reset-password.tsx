import { useTranslation } from 'react-i18next'
import { ETrans } from '@/types/translations'
import { Brand, Button, LinkButton, TextBox } from '@/components'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

enum EResetFormMode {
    DEFAULT,
    SENT,
    SET,
    DONE
}

const ResetPasswordPage = () => {
    const { t } = useTranslation()
    const router = useRouter()

    const id = Array.isArray(router.query.id) ? router.query.id.join('') : router.query.id

    useEffect(() => {
        if (id) {
            setResetFormMode(EResetFormMode.SET)
        }
    }, [id])

    const [resetFormMode, setResetFormMode] = useState<EResetFormMode>(id ? EResetFormMode.SET : EResetFormMode.DEFAULT)

    const submit = () => {
        setResetFormMode(resetFormMode === EResetFormMode.DEFAULT ? EResetFormMode.SENT : EResetFormMode.DONE)
    }

    const DefaultFields = () => resetFormMode === EResetFormMode.DEFAULT ? <>
        <TextBox
            id="mail"
            label={t(ETrans.MAIL)}
        />
    </> : <></>

    const SetFields = () => resetFormMode === EResetFormMode.SET ? <>
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
    </> : <></>

    const Footer = () => {
        if (resetFormMode === EResetFormMode.SENT) {
            return <></>
        }

        let label = t(ETrans.REQUEST_RESET_LINK)

        if (resetFormMode === EResetFormMode.SET) {
            label = t(ETrans.SAVE)
        }

        if (resetFormMode === EResetFormMode.DONE) {
            label = t(ETrans.BACK_TO_LOGIN)
        }

        const BackLink = () => resetFormMode === EResetFormMode.DONE ? <></> : <LinkButton
            href={'/login'}
            label={t(ETrans.CANCEL)}
        />

        const SubmitButton = () => resetFormMode === EResetFormMode.DONE ? <Button
            href={'/login'}
            label={label}
        /> : <Button
            onClick={submit}
            label={label}
        />

        return <div className="login__footer">
            <BackLink />
            <SubmitButton />
        </div>
    }

    const Hint = () => {
        let hint = t(ETrans.RESET_PASSWORD_HINT)

        if (resetFormMode === EResetFormMode.SENT) {
            hint = t(ETrans.RESET_PASSWORD_SENT)
        }

        if (resetFormMode === EResetFormMode.SET) {
            hint = t(ETrans.RESET_PASSWORD_SET)
        }

        if (resetFormMode === EResetFormMode.DONE) {
            hint = t(ETrans.RESET_PASSWORD_CONFIRMED)
        }
        return <div className="login__hint">
            {hint}
        </div>
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
                            <Hint />
                        </div>
                        <div className="login__content">
                            <DefaultFields />
                            <SetFields />
                        </div>
                        <Footer />
                    </div>
                </div>
            </div>
        </div>
    </section>
}

export default ResetPasswordPage
