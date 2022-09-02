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
}
const SelectionContext = createContext<SelectionContext | null>(null)

const SelectionProvider = ({ children }: Props) => {
    const [selected, setSelected] = useState(new Set<TMedia>())

    const addSelected = (items: TMedia | TMedia[]) => {
        const itemsToAdd = Array.isArray(items) ? items : [items]
        const newSet = selected

        itemsToAdd.forEach((item) => {
            newSet.add(item)
        })

        setSelected(newSet)
    }

    const removeSelected = (items: TMedia | TMedia[]) => {
        const itemsToRemove = Array.isArray(items) ? items : [items]
        const newSet = selected

        itemsToRemove.forEach((item) => {
            newSet.delete(item)
        })

        setSelected(newSet)
    }

    const isSelected = (items: TMedia | TMedia[]) => {
        const itemsToCheck = Array.isArray(items) ? items : [items]

        return itemsToCheck.every((item) => selected.has(item))
    }

    return <SelectionContext.Provider value={{
        selected,
        addSelected,
        removeSelected,
        isSelected
    }}
    >
        {children}
    </SelectionContext.Provider>
}

export {
    SelectionProvider, SelectionContext
}
