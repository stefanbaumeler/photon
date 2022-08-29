import { createContext } from 'react'
import { TMedia } from '@/types/api'

interface DetailsContext {
    active: boolean
    medium: TMedia
    openDetails: (medium: TMedia) => void
    closeDetails: () => void
}
const context = createContext<DetailsContext | null>(null)

export default context
