import { createContext, ReactNode, useState } from 'react'
import { TMedia } from '@/types/api'

type Props = {
    children?: ReactNode
}

interface SelectionContext {
    selected: Set<TMedia>
    addSelected: (media: TMedia | TMedia[]) => void
    removeSelected: (media: TMedia | TMedia[]) => void
    isSelected: (media: TMedia | TMedia[]) => boolean
    clearSelected: () => void
    isInSelectionMode: boolean
}
const SelectionContext = createContext<SelectionContext | null>(null)

const SelectionProvider = ({ children }: Props) => {
    const [selected, setSelected] = useState(new Set<TMedia>())
    const [isInSelectionMode, setIsInSelectionMode] = useState(false)

    const addSelected = (items: TMedia | TMedia[]) => {
        const itemsToAdd = Array.isArray(items) ? items : [items]
        const newSet = new Set(selected)

        itemsToAdd.forEach((item) => {
            newSet.add(item)
        })

        setSelected(newSet)
        setIsInSelectionMode(newSet.size !== 0)
    }

    const removeSelected = (items: TMedia | TMedia[]) => {
        const itemsToRemove = Array.isArray(items) ? items : [items]
        const newSet = new Set(selected)

        itemsToRemove.forEach((item) => {
            newSet.delete(item)
        })

        setSelected(newSet)
        setIsInSelectionMode(newSet.size !== 0)
    }

    const isSelected = (items: TMedia | TMedia[]) => {
        const itemsToCheck = Array.isArray(items) ? items : [items]

        return itemsToCheck.every((item) => selected.has(item))
    }

    const clearSelected = () => {
        setSelected(new Set())
        setIsInSelectionMode(false)
    }

    return <SelectionContext.Provider value={{
        selected,
        addSelected,
        removeSelected,
        isSelected,
        clearSelected,
        isInSelectionMode
    }}
    >
        {children}
    </SelectionContext.Provider>
}

export {
    SelectionProvider, SelectionContext
}
