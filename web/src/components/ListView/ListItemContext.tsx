import { createContext, ReactNode, useContext } from 'react'
import { TAlbum, TMedium } from '@photon/schema'
import { isMedium } from '@/util/is'
import { useRouter } from 'next/router'
import { useDetailsContext } from '@/providers'

type Props = {
    children?: ReactNode
    element: TMedium | TAlbum
}

interface ListItemContext {
    element: TMedium | TAlbum
    open: () => void
}

const ListItemContext = createContext<ListItemContext | null>(null)

const ListItemProvider = ({
    element, children
}: Props) => {
    const router = useRouter()
    const details = useDetailsContext()

    const open = () => {
        if (isMedium(element)) {
            details.open(element.id)
        } else {
            router.push(`albums/${element.id}`)
        }
    }

    return <ListItemContext.Provider value={{
        element,
        open
    }}
    >
        {children}
    </ListItemContext.Provider>
}

const useListItemContext = () => {
    return useContext(ListItemContext)
}

export {
    ListItemProvider, useListItemContext
}
