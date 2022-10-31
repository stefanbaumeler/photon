import { Dispatch, SetStateAction } from 'react'
import { TMedium } from '@/types/api'

export type TMediaInput = {

}

export type TMediumInput = {
    id: string
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
    pathname: string
}

export type GalleryItem = {
    medium: TMedium
    ratio: number
    width?: number
    height?: number
}

export type TThumbnail = {
    type: EThumbnailType
    title?: string
    idMedium?: string | number
    onClick: () => void
}

export type TDropdownItem = {
    label: string
    callback: () => void
}

export enum ENavItemType {
    ALBUMS = 'ALBUMS'
}

export enum ESelectionMode {
    SELECT = 'SELECT',
    DELETE = 'DELETE',
    OFF = 'OFF'
}

export enum EThumbnailType {
    DEFAULT = 'DEFAULT',
    ADD ='ADD'
}

export enum EEditState {
    OFF = 'OFF',
    DISCARDED = 'DISCARDED',
    CONFIRMED = 'CONFIRMED',
    EDITING = 'EDITING'
}

export enum EDateFormat {
    SHORT = 'short',
    LONG = 'long'
}

export enum EMediumStatus {
    DEFAULT = 'default',
    ARCHIVED = 'archived',
    TRASH = 'trash'
}
