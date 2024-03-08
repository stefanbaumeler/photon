import { ReactNode } from 'react'
import { useSelectionContext } from '@/providers'
import { ESelectionMode } from '@/types/app'
import bem from '../util/bem'

type Props = {
    children?: ReactNode
}

const AppLayout = ({ children }: Props) => {
    const selection = useSelectionContext()

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
            <main className="main">
                {children}
            </main>
        </div>
    </>
}

export default AppLayout
