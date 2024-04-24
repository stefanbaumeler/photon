import AppLayout from '@/layouts/app-layout'
import { Uploader } from '@/components/shared/Uploader'
import { Media } from '@/components/shared/Media'
import { EMediumStatus } from '@/types/app'
import { Suspense } from 'react'

type Props = {
    favorites?: boolean
    status?: EMediumStatus
}

const GalleryPage = async ({
    favorites, status
}: Props) => {
    return <AppLayout
        favorites={favorites}
        status={status}
    >
        <Uploader />
        <Suspense fallback={<p>
            Loading...
        </p>}
        >
            <Media />
        </Suspense>
    </AppLayout>
}

export default GalleryPage
