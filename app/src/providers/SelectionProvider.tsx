import { createContext, Dispatch, ReactNode, SetStateAction, useState } from 'react'
import { TMedium } from '@/types/api'
import { ESelectionMode } from '@/types/app'

type Props = {
    children?: ReactNode
}

interface SelectionContext {
    selected: Set<TMedium>
    add: (media: TMedium | TMedium[]) => void
    remove: (media: TMedium | TMedium[]) => void
    toggle: (media: TMedium | TMedium[]) => void
    isSelected: (media: TMedium | TMedium[]) => boolean
    clear: () => void
    mode: ESelectionMode
    setMode: Dispatch<SetStateAction<ESelectionMode>>
}
const SelectionContext = createContext<SelectionContext | null>(null)

const SelectionProvider = ({ children }: Props) => {
    const [selected, setSelected] = useState(new Set<TMedium>())
    const [mode, setMode] = useState(ESelectionMode.OFF)

    const add = (items: TMedium | TMedium[]) => {
        const itemsToAdd = Array.isArray(items) ? items : [items]
        const newSet = new Set(selected)

        itemsToAdd.forEach((item) => {
            newSet.add(item)
        })

        setSelected(newSet)

        if (newSet.size === 0) {
            setMode(ESelectionMode.OFF)
        }
    }

    const remove = (items: TMedium | TMedium[]) => {
        const itemsToRemove = Array.isArray(items) ? items : [items]
        const newSet = new Set(selected)

        itemsToRemove.forEach((item) => {
            newSet.delete(item)
        })

        setSelected(newSet)

        if (newSet.size === 0) {
            setMode(ESelectionMode.OFF)
        }
    }

    const toggle = (items: TMedium | TMedium[]) => {
        const itemsToToggle = Array.isArray(items) ? items : [items]

        itemsToToggle.forEach((item) => {
            if (isSelected(item)) {
                remove(item)
            } else {
                add(item)
            }
        })
    }

    const isSelected = (items: TMedium | TMedium[]) => {
        const itemsToCheck = Array.isArray(items) ? items : [items]

        return itemsToCheck.every((item) => selected.has(item))
    }

    const clear = () => {
        setSelected(new Set())
        setMode(ESelectionMode.OFF)
    }

    return <SelectionContext.Provider value={{
        selected,
        add,
        remove,
        toggle,
        isSelected,
        clear,
        mode,
        setMode
    }}
    >
        {children}
    </SelectionContext.Provider>
}

export {
    SelectionProvider, SelectionContext
}
