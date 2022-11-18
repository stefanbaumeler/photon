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
    lastAdded: TMedium
    shiftTargets: TMedium[]
    setShiftTargets: Dispatch<SetStateAction<TMedium[]>>
}
const SelectionContext = createContext<SelectionContext | null>(null)

const SelectionProvider = ({ children }: Props) => {
    const [selected, setSelected] = useState(new Set<TMedium>())
    const [mode, setMode] = useState(ESelectionMode.OFF)
    const [lastAdded, setLastAdded] = useState<TMedium>()
    const [shiftTargets, setShiftTargets] = useState<TMedium[]>([])

    const add = (items: TMedium | TMedium[]) => {
        const itemsToAdd = Array.isArray(items) ? items : [items]

        const newSet = mode === ESelectionMode.SINGLE
            ? new Set(itemsToAdd)
            : new Set([...selected, ...itemsToAdd])

        setSelected(newSet)

        if (itemsToAdd.indexOf(lastAdded) === itemsToAdd.length - 1) {
            setLastAdded(itemsToAdd[0])
        }
        else {
            setLastAdded(itemsToAdd[itemsToAdd.length - 1])
        }

        if (newSet.size === 0) {
            setMode(ESelectionMode.OFF)
        }
    }

    const remove = (items: TMedium | TMedium[]) => {
        if (mode === ESelectionMode.SINGLE) {
            return
        }

        const itemsToRemove = Array.isArray(items) ? items : [items]
        const newSet = new Set(selected)

        itemsToRemove.forEach((item) => {
            newSet.delete(item)
        })

        setSelected(newSet)
        setLastAdded(undefined)

        if (newSet.size === 0) {
            setMode(ESelectionMode.OFF)
        }
    }

    const toggle = (items: TMedium | TMedium[]) => {
        const itemsToToggle = Array.isArray(items) ? items : [items]

        if (isSelected(itemsToToggle)) {
            remove(itemsToToggle)
        }
        else {
            add(itemsToToggle)
        }
    }

    const isSelected = (items: TMedium | TMedium[]) => {
        const itemsToCheck = Array.isArray(items) ? items : [items]

        return itemsToCheck.every((item) => selected.has(item))
    }

    const clear = () => {
        setSelected(new Set())
        setMode(ESelectionMode.OFF)
        setShiftTargets([])
        setLastAdded(undefined)
    }

    return <SelectionContext.Provider value={{
        selected,
        add,
        remove,
        toggle,
        isSelected,
        clear,
        mode,
        setMode,
        lastAdded,
        shiftTargets,
        setShiftTargets
    }}
    >
        {children}
    </SelectionContext.Provider>
}

export {
    SelectionProvider, SelectionContext
}
