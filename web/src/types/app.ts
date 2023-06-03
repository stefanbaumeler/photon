import { Dispatch, SetStateAction } from 'react'
import { TMedium } from '@photon/schema'

export type TNavItem = {
    label: string
    icon: string
    active?: boolean
    subNav?: string
    href?: string
    type?: ENavItemType
    testId?: string
    onDrop?: () => void
    canDrop?: boolean
}

export type TNav = {
    id: ENavs
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
    icon?: string
    testId?: string
}

export enum ENavs {
    HOME = 'HOME',
    SETTINGS = 'SETTINGS',
    USER = 'USER'
}

export enum ENavItemType {
    ALL = 'ALL',
    ALBUMS = 'ALBUMS',
    FAVORITES = 'FAVORITES'
}

export enum ESelectionMode {
    SELECT = 'SELECT',
    DELETE = 'DELETE',
    SINGLE = 'SINGLE',
    OFF = 'OFF'
}

export enum EThumbnailType {
    DEFAULT = 'DEFAULT',
    ADD = 'ADD'
}

export enum EEditState {
    OFF = 'OFF',
    DISCARDED = 'DISCARDED',
    CONFIRMED = 'CONFIRMED',
    EDITING = 'EDITING'
}

export enum EDateFormat {
    SHORT = 'SHORT',
    LONG = 'LONG',
    SHORT_NO_DATE = 'SHORT_NO_DATE'
}

export enum EActionLocation {
    DETAILS = 'DETAILS',
    DETAILS_SELECT = 'DETAILS_SELECT',
    SELECT = 'SELECT',
    MEDIUM_SELECT = 'MEDIUM_SELECT'
}

export enum EMediumStatus {
    ALL = 'all',
    ARCHIVED = 'archived',
    TRASH = 'trash'
}

export enum EMediumSort {
    NEWEST = 'newest',
    OLDEST = 'oldest',
    RECENT = 'recent'
}

export enum ELayout {
    MAP = 'MAP',
    LIST = 'LIST',
    GALLERY = 'GALLERY',
    GRID = 'GRID'
}
