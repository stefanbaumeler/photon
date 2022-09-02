import { Dispatch, SetStateAction } from 'react'

export type TMediaInput = {

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
}
