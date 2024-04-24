import { ReactNode } from 'react'
import AuthGuard from '@/api/AuthGuard'
import { InfobarProvider } from '@/components/shared/Infobar/components/InfobarProvider'

type Props = {
    children?: ReactNode
}

const DetailsLayout = ({ children }: Props) => {
    return <AuthGuard>
        <div
            id="root"
        >
            <div id="modal-root"></div>
            {/*<VerifyAccountMessage />*/}
            <div
                id="app-root"
                data-testid="content-root"
            >
                <InfobarProvider>
                    {children}
                </InfobarProvider>
            </div>
        </div>
    </AuthGuard>
}

export default DetailsLayout
