import { CreateAlbumControl, AlbumsViewControl } from '@/components/controls'

export const AlbumsControls = () => {
    return <div className="actions">
        <AlbumsViewControl />
        <CreateAlbumControl shortcut={true} />
    </div>
}
