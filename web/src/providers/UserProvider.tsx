import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useEffect, useState } from 'react'
import { TUser } from '@photon/schema'
import i18next from '@/translations'

type Props = {
    children?: ReactNode
}

interface UserContext {
    user: TUser
    setUser: Dispatch<SetStateAction<TUser>>
}

const UserContext = createContext<UserContext | null>(null)

const UserProvider = ({ children }: Props) => {
    const [user, setUser] = useState<TUser>()

    useEffect(() => {
        if (user?.language) {
            i18next.changeLanguage(user.language)
        }
    }, [user?.language])

    return <UserContext.Provider value={{
        user,
        setUser
    }}
    >
        {children}
    </UserContext.Provider>
}

const useUserContext = () => {
    return useContext(UserContext)
}
export {
    UserProvider, useUserContext
}
