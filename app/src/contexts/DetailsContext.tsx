import { createContext } from 'react'
import { TMedia } from '@/types/api'

interface DetailsContext {
    active: boolean
    infos: boolean
    medium: TMedia
    collection: TMedia[]
    openDetails: (medium: TMedia, collection: TMedia[]) => void
    closeDetails: () => void
    openInfos: () => void
    closeInfos: () => void
}
const context = createContext<DetailsContext | null>(null)

export default context
