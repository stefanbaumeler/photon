import { useMSignIn, useMSignUp, QMediaDocument } from '@/api'
import { useTranslation } from 'react-i18next'
import { ETrans } from '@/types/translations'
import { Brand, Button, LinkButton, TextBox, Checkbox } from '@/components'
import { useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/router'
import { EMediumStatus } from '@/types/app'

enum ELoginFormMode {
    DEFAULT,
    SIGNUP
}

const LoginPage = () => {
    const [signIn] = useMSignIn({
        refetchQueries: [{
            query: QMediaDocument,
            variables: {
                status: EMediumStatus.DEFAULT
            }
        }]
    })
    const [signUp] = useMSignUp()
    const { t } = useTranslation()
    const [loginFormMode, setLoginFormMode] = useState<ELoginFormMode>(ELoginFormMode.DEFAULT)
    const [mail, setMail] = useState('')
    const [password, setPassword] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')

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
    }, [mail, password, firstName, lastName, loginFormMode])

    const router = useRouter()

    const signInUser = () => {
        signIn({
            variables: {
                mail,
                password
            }
        }).then(async (res) => {
            console.log(res)
            if (res.data.signIn.accessToken.length) {
                await router.push('/')
            }
        })
    }

    const signUpUser = () => {
        signUp({
            variables: {
                firstName,
                lastName,
                mail,
                password
            }
        }).then((res) => {
            console.log(res)
        })
    }

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

    const submit = () => {
        if (loginFormMode === ELoginFormMode.DEFAULT) {
            signInUser()
        }

        if (loginFormMode === ELoginFormMode.SIGNUP) {
            signUpUser()
        }
    }

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
                            id={'mail'}
                            label={t(ETrans.MAIL)}
                            value={mail}
                            onChange={(event) => setMail(event.target.value)}
                        />
                        <TextBox
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
