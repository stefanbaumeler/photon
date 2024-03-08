import { createContext, ReactNode, useContext, useEffect, useState } from 'react'
import { TQFavorites, TUser, useQFavorites, useQProfile } from '@photon/schema'
import i18next from '@/translations'

type Props = {
    children?: ReactNode
}

interface UserContext {
    user: TUser
    favorites: TQFavorites['favorites']
    unauthenticated: boolean
    // setUser: Dispatch<SetStateAction<Omit<TUser, 'favorites'>>>
}

const UserContext = createContext<UserContext | null>(null)

const UserProvider = ({ children }: Props) => {
    const [unauthenticated, setUnauthenticated] = useState(false)

    const [{ data: profile }] = useQProfile()

    const [{  data: favorites }] = useQFavorites()

    const user = profile?.profile

    useEffect(() => {
        if (user?.language) {
            i18next.changeLanguage(user.language)
        }
    }, [user?.language])

    useEffect(() => {
        if (!window.localStorage.photon) {
            setUnauthenticated(true)
        }
    }, [])

    return <UserContext.Provider value={{
        user,
        favorites: favorites?.favorites,
        unauthenticated
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
