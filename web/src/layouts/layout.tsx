import { ReactNode, useEffect } from 'react'
import { SearchBar, Sidebar, FocusOverlay } from '@/components'
import { useSelectionContext, useUserContext } from '@/providers'
import { ESelectionMode } from '@/types/app'
import bem from '../util/bem'
import { useQProfile } from '@photon/schema'

type Props = {
    children?: ReactNode
}

const Layout = ({ children }: Props) => {
    const selection = useSelectionContext()
    const user = useUserContext()
    const [profile] = useQProfile()

    useEffect(() => {
        if (!user.user && profile.data?.profile) {
            user.setUser(profile.data?.profile)
        }
    }, [profile.data?.profile, user])

    const classes = bem('root', [
        ['selecting', selection.mode !== ESelectionMode.OFF]
    ])

    return <>
        <div id="modal-root"></div>
        <div
            id="content-root"
            data-testid="content-root"
            className={classes}
        >
            <FocusOverlay />
            <SearchBar />
            <Sidebar />
            <main className="main">
                {children}
            </main>
        </div>
    </>
}

export default Layout
