import { useSelectionContext } from '@/providers'
import { ESelectionMode } from '@/types/app'
import { useRouter } from 'next/router'
import { CreateAlbumControl, AlbumsViewControl } from '@/components/controls'

export const AlbumsControls = () => {
    const selection = useSelectionContext()
    const router = useRouter()

    if (router.pathname !== '/albums' || selection.mode !== ESelectionMode.OFF) {
        return <></>
    }

    return <div className="actions">
        <AlbumsViewControl />
        <CreateAlbumControl shortcut={true} />
    </div>
}
