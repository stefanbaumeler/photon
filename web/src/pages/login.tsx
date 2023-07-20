import { useMSignIn, useMSignUp } from '@photon/schema'
import { useTranslation } from 'react-i18next'
import { ETrans } from '@/types/translations'
import { Brand, Button, LinkButton, TextBox, Checkbox } from '@/components'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/router'
import { useUserContext } from '@/providers'
import { initializeUrqlClient } from '@/api'

enum ELoginFormMode {
    DEFAULT,
    SIGNUP
}

const LoginPage = () => {
    const [, signIn] = useMSignIn()
    const [, signUp] = useMSignUp()
    const { t } = useTranslation()
    const [loginFormMode, setLoginFormMode] = useState<ELoginFormMode>(ELoginFormMode.DEFAULT)
    const [mail, setMail] = useState('')
    const [password, setPassword] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const router = useRouter()
    const user = useUserContext()

    const submit = useCallback(async () => {
        let data

        if (loginFormMode === ELoginFormMode.DEFAULT) {
            const res = await signIn({
                mail,
                password
            })

            data = res.data.signIn
        }

        if (loginFormMode === ELoginFormMode.SIGNUP) {
            const res = await signUp({
                firstName,
                lastName,
                mail,
                password
            })

            data = res.data.signUp
        }

        user.setUser(data.user)
        localStorage.photon = JSON.stringify({
            accessToken: data.accessToken,
            refreshToken: data.refreshToken
        })

        if (data.accessToken.length) {
            await router.push('/')
            initializeUrqlClient()
        }
    }, [loginFormMode, signIn, signUp, firstName, lastName, mail, password, router, user])

    useEffect(() => {
        const keyDownHandler = (event: KeyboardEvent) => {
            if (event.key === 'Enter') {
                event.preventDefault()

                if (mail && password) {
                    if (loginFormMode === ELoginFormMode.DEFAULT) {
                        submit()
                    }

                    if (loginFormMode === ELoginFormMode.SIGNUP && firstName && lastName) {
                        submit()
                    }
                }
            }
        }

        document.addEventListener('keydown', keyDownHandler)

        return () => {
            document.removeEventListener('keydown', keyDownHandler)
        }
    }, [submit, mail, password, firstName, lastName, loginFormMode])

    const title = loginFormMode === ELoginFormMode.SIGNUP ? t(ETrans.SIGN_UP) : t(ETrans.SIGN_IN)

    const SignUpFields = useMemo(() => loginFormMode === ELoginFormMode.SIGNUP ? <>
        <TextBox
            id={'firstName'}
            label={t(ETrans.FIRST_NAME)}
            value={firstName}
            onChange={(event) => setFirstName(event.target.value)}
        />
        <TextBox
            id={'lastName'}
            label={t(ETrans.LAST_NAME)}
            value={lastName}
            onChange={(event) => setLastName(event.target.value)}
        />
    </> : <></>, [loginFormMode, firstName, lastName])

    const SignInLinks = () => loginFormMode === ELoginFormMode.DEFAULT ? <>
        <LinkButton
            onClick={() => setLoginFormMode(ELoginFormMode.SIGNUP)}
            prefix={t(ETrans.NEW_HERE)}
            label={`${t(ETrans.SIGN_UP)}!`}
        />
        <LinkButton
            href={'/reset-password'}
            label={`${t(ETrans.FORGOT_PASSWORD)}?`}
        />
    </> : <></>

    const SignUpLinks = () => loginFormMode === ELoginFormMode.SIGNUP ? <>
        <LinkButton
            onClick={() => setLoginFormMode(ELoginFormMode.DEFAULT)}
            prefix={t(ETrans.HAVE_ACCOUNT)}
            label={`${t(ETrans.SIGN_IN)}`}
        />
    </> : <></>

    const RememberMe = () => loginFormMode === ELoginFormMode.DEFAULT ? <>
        <Checkbox
            id={'remember'}
            label={t(ETrans.REMEMBER_ME)}
        />
    </> : <></>

    return <section>
        <div className="login">
            <div className="login__container">
                <div className="login__content-container">
                    <div className="login__content">
                        <div className="login__header">
                            <Brand />
                            <h1 className="login__title">
                                {title}
                            </h1>
                        </div>
                        {SignUpFields}
                        <TextBox
                            testId="signin-mail"
                            id={'mail'}
                            label={t(ETrans.MAIL)}
                            value={mail}
                            onChange={(event) => setMail(event.target.value)}
                        />
                        <TextBox
                            testId="signin-password"
                            id={'password'}
                            label={t(ETrans.PASSWORD)}
                            type="password"
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                        />
                        <RememberMe />
                        <div className="login__footer">
                            <div className="login__links">
                                <SignInLinks />
                                <SignUpLinks />
                            </div>
                            <Button
                                testId="signin-confirm"
                                onClick={submit}
                                label={loginFormMode === ELoginFormMode.DEFAULT ? t(ETrans.SIGN_IN) : t(ETrans.SIGN_UP)}
                            />
                        </div>
                    </div>
                </div>
                <div className="login__image"></div>
            </div>
        </div>
    </section>
}

export default LoginPage
