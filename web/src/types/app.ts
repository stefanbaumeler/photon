import { Dispatch, SetStateAction } from 'react'
import { TMedium, TMeta, TUser } from '@photon/schema'

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
    getActiveItem: () => TNavItem | undefined
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
    shortcut?: string
}

export type TCover = Pick<TMedium, 'filenameDisk' | 'mimetype' | 'id'> & { meta: Pick<TMeta, 'width' | 'height'> }

export type TGridItem = {
    id: string
    href: string
    favoredBy?: number
    cover: TCover | null
    title?: string
    stack: string[]
}

export type TMapItem = {
    id: string
    cover: TCover | null
    width: number
    location?: number[]
    favoredBy?: number
}

type TListItem = {
    id: string
    cover: TCover | null
    title?: string
    owner: Pick<TUser, 'firstName' | 'lastName'>
}

export type TMediumListItem = TListItem & {
    favoredBy?: number
    dateTaken: string
    mimetype: string
}

export type TAlbumListItem = TListItem & {
    albumMedia: string[]
}

export type TFilmStripItem = {
    id: string
    cover: TCover | null
    favoredBy?: number
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
    OFF = 'OFF',
    ALBUMS = 'ALBUMS'
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

export enum EKeyboardScope {
    default = 'DEFAULT',
    disabled = 'DISABLED',
    dialog = 'DIALOG',
    dropdown = 'DROPDOWN',
    details = 'DETAILS',
    select = 'SELECT',
    gallery = 'GALLERY',
    map = 'MAP',
    list = 'LIST',
    album = 'ALBUM',
    edit = 'EDIT',
}
