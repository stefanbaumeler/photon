import { Uploader } from '@/components/shared/Uploader'
import { Media } from '@/components/shared/Media'
import AppLayout from '@/layouts/app-layout'
import { AlbumDetails } from '@/components/shared/AlbumDetails'
import { Suspense } from 'react'

const AlbumPage = () => {
    return <AppLayout>
        <AlbumDetails />
        <Uploader />
        <Suspense>
            <Media />
        </Suspense>
    </AppLayout>
}

export default AlbumPage
