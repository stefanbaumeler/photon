import '@/styles/index.scss'
import 'tippy.js/themes/light.css'

import tauri from '@/tauri'
import { DatepickerConfig } from '@/components/shared/DatepickerConfig'
import { ReactNode } from 'react'
import { BaseProviders } from '@/providers/BaseProviders'
import AuthGuard from '@/api/AuthGuard'
import { TippyConfig } from '@/components/shared/TippyConfig'

tauri.createBaseDir()

export const metadata = {
    title: 'Photon',
    description: ''
}

const RootLayout = ({ children }: {
    children: ReactNode
}) => {
    return <>
        <DatepickerConfig />
        <TippyConfig />
        <html lang="en">
            <body>

                <div
                    id="root"
                >
                    <BaseProviders>
                        <div id="modal-root"></div>
                        {/*<VerifyAccountMessage />*/}
                        <div
                            id="app-root"
                            data-testid="content-root"
                            className="root"
                        >

                            <AuthGuard>
                                {children}
                            </AuthGuard>
                        </div>
                    </BaseProviders>
                </div>
            </body>
        </html>
    </>
}

export default RootLayout
