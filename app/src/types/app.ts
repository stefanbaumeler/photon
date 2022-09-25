import { Dispatch, SetStateAction } from 'react'
import { TMedium } from '@/types/api'

export type TMediaInput = {

}

export type TAlbumsInput = {

}

export type TAlbumInput = {
    id: string
}

export type TDialogButton = {
    label: string
    action: () => void
    type?: 'secondary'
}

export type TNavItem = {
    label: string
    icon: string
    active?: boolean
    subNav?: string
    href?: string
    type?: string
}

export type TNav = {
    id: string
    type: string
    items: TNavItem[]
}

export type TNavContext = {
    active: string[]
    setActive: Dispatch<SetStateAction<string[]>>
    navs: TNav[]
    getActiveItem: () => TNavItem
}

export type GalleryItem = {
    medium: TMedium
    ratio: number
    width?: number
    height?: number
}

export enum ENavItemType {
    ALBUMS = 'ALBUMS'
}
