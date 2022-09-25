import { createContext, ReactNode, useState } from 'react'
import { TMedium } from '@/types/api'

type Props = {
    children?: ReactNode
}

interface SelectionContext {
    selected: Set<TMedium>
    addSelected: (media: TMedium | TMedium[]) => void
    removeSelected: (media: TMedium | TMedium[]) => void
    isSelected: (media: TMedium | TMedium[]) => boolean
    clearSelected: () => void
    isInSelectionMode: boolean
}
const SelectionContext = createContext<SelectionContext | null>(null)

const SelectionProvider = ({ children }: Props) => {
    const [selected, setSelected] = useState(new Set<TMedium>())
    const [isInSelectionMode, setIsInSelectionMode] = useState(false)

    const addSelected = (items: TMedium | TMedium[]) => {
        const itemsToAdd = Array.isArray(items) ? items : [items]
        const newSet = new Set(selected)

        itemsToAdd.forEach((item) => {
            newSet.add(item)
        })

        setSelected(newSet)
        setIsInSelectionMode(newSet.size !== 0)
    }

    const removeSelected = (items: TMedium | TMedium[]) => {
        const itemsToRemove = Array.isArray(items) ? items : [items]
        const newSet = new Set(selected)

        itemsToRemove.forEach((item) => {
            newSet.delete(item)
        })

        setSelected(newSet)
        setIsInSelectionMode(newSet.size !== 0)
    }

    const isSelected = (items: TMedium | TMedium[]) => {
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
