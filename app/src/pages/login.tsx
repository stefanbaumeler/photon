import { useMLogin, useMSignup } from '@photon/shared'

const LoginPage = () => {
    const [login] = useMLogin()
    const [signup] = useMSignup()

    const loginUser = () => {
        login({
            variables: {
                mail: 'ffffoo@bar.com',
                password: 'mypass'
            }
        }).then((res) => {
            localStorage
        })
    }

    const signupUser = () => {
        signup({
            variables: {
                firstName: 'Foo',
                lastName: 'Bar',
                mail: 'ffffoo@bar.com',
                password: 'mypass'
            }
        }).then((res) => {
            console.log(res)
        })
    }

    return <section>
        <button
            onClick={loginUser}
        >
            Login
        </button>
        <button
            onClick={signupUser}
        >
            Signup
        </button>
    </section>
}

export default LoginPage
