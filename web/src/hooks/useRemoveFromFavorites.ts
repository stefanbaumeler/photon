import { useMDeleteFavorites } from '@photon/schema/dist/client'
import { usePathname, useRouter } from 'next/navigation'
import { useSearchContext } from '@/providers/SearchProvider'
import { useMediumFromRouter } from '@/hooks/useMediumFromRouter'
import { getParentUrl } from '@/util/routing'

export const useRemoveFromFavorites = (mediaIds: string[]) => {
    const pathname = usePathname()
    const router = useRouter()

    const {
        medium, id
    } = useMediumFromRouter()
    const { hits: media } = useSearchContext()
    const index = media.map(({ id }) => id).indexOf(id)
    const next = media[index + 1]
    const prev = media[index - 1]
    const parent = getParentUrl(pathname)
    const evade = next?.id ?? prev?.id ?? parent

    const [, removeFromFavorites] = useMDeleteFavorites()

    return () => {
        removeFromFavorites({
            ids: mediaIds
        }).then(() => {
            if (medium) {
                router.push(evade)
            }
        })
    }
}
