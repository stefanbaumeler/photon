import { ReactNode } from 'react'
import { FocusOverlay } from '@/components/shared/FocusOverlay'
import { Sidebar } from '@/components/shared/Sidebar'

type Props = {
    children?: ReactNode
}

const GalleryLayout = ({ children }: Props) => {
    return <>
        <FocusOverlay />
        <Sidebar />
        {children}
    </>
}

export default GalleryLayout
