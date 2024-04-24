'use client'

import { ReactNode } from 'react'
import { EMediumStatus, ESelectionMode } from '@/types/app'
import bem from '../util/bem'
import AuthGuard from '@/api/AuthGuard'
import { SearchProvider } from '@/providers/SearchProvider'
import { useSelectionContext } from '@/providers/SelectionProvider'
import { InfobarProvider } from '@/components/shared/Infobar/components/InfobarContext'

type Props = {
    children?: ReactNode
    status?: EMediumStatus
    favorites?: boolean
}

const DetailsLayout = ({
    children, status, favorites
}: Props) => {
    const selection = useSelectionContext()

    const classes = bem('root', [
        ['selecting', selection.mode !== ESelectionMode.OFF]
    ])

    return <SearchProvider
        status={status}
        favorites={favorites}
    >
        <AuthGuard>
            <div
                id="root"
            >
                <div id="modal-root"></div>
                {/*<VerifyAccountMessage />*/}
                <div
                    id="app-root"
                    data-testid="content-root"
                    className={classes}
                >
                    <InfobarProvider>
                        {children}
                    </InfobarProvider>
                </div>
            </div>
        </AuthGuard>
    </SearchProvider>
}

export default DetailsLayout
