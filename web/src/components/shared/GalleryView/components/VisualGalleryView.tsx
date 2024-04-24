import { Scrollbar } from '@/components/shared/Scrollbar'
import { ReactNode } from 'react'

type Props = {
    children: ReactNode
}

export const VisualGalleryView = ({ children }: Props) => {
    return <div className="gallery">
        <div className="gallery__sections">
            {children}
        </div>
        <Scrollbar />
    </div>
}
