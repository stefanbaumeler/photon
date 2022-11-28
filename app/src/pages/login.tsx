import { useMSignIn, useMSignUp } from '@photon/shared'
import { useTranslation } from 'react-i18next'
import { ETrans } from '@/types/translations'
import { Brand, Button, LinkButton, TextBox, Checkbox } from '@/components'
import { useState } from 'react'
import { useRouter } from 'next/router'

enum ELoginFormMode {
    DEFAULT,
    SIGNUP
}

const LoginPage = () => {
    const [signIn] = useMSignIn()
    const [signUp] = useMSignUp()
    const { t } = useTranslation()
    const [loginFormMode, setLoginFormMode] = useState<ELoginFormMode>(ELoginFormMode.DEFAULT)
    const router = useRouter()

    const signInUser = () => {
        signIn({
            variables: {
                mail: 'foo@bar.com',
                password: 'mypass'
            }
        }).then(() => {
            router.push('/')
        })
    }

    const signupUser = () => {
        signUp({
            variables: {
                firstName: 'Foo',
                lastName: 'Bar',
                mail: 'foo@bar.com',
                password: 'mypass'
            }
        }).then((res) => {
            console.log(res)
        })
    }

    const title = loginFormMode === ELoginFormMode.SIGNUP ? t(ETrans.SIGN_UP) : t(ETrans.SIGN_IN)

    const SignUpFields = () => loginFormMode === ELoginFormMode.SIGNUP ? <>
        <TextBox
            id={'fistname'}
            label={t(ETrans.FIRST_NAME)}
        />
        <TextBox
            id={'lastname'}
            label={t(ETrans.LAST_NAME)}
            type="password"
        />
    </> : <></>

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
        signInUser()
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
                        <SignUpFields />
                        <TextBox
                            id={'mail'}
                            label={t(ETrans.MAIL)}
                        />
                        <TextBox
                            id={'password'}
                            label={t(ETrans.PASSWORD)}
                            type="password"
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
