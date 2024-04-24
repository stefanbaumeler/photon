import { AlbumsViewControl } from '@/components/controls/AlbumsViewControl'
import { CreateAlbumControl } from '@/components/controls/CreateAlbumControl'

export const AlbumsControls = () => {
    return <div className="actions">
        <AlbumsViewControl />
        <CreateAlbumControl shortcut />
    </div>
}
