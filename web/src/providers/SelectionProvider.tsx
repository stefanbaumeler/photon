import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useState } from 'react'
import { TAlbum, TMedium } from '@photon/schema'
import { ESelectionMode } from '@/types/app'
import { useKeyboard } from '@/hooks/keyboard'

type Props = {
    children?: ReactNode
}

interface SelectionContext {
    shift: boolean
    selected: Set<TMedium | TAlbum>
    add: (media: TMedium | TAlbum | (TMedium | TAlbum)[]) => void
    remove: (media: TMedium | TAlbum | (TMedium | TAlbum)[]) => void
    toggle: (media: TMedium | TAlbum | (TMedium | TAlbum)[]) => void
    isSelected: (media: TMedium | TAlbum | (TMedium | TAlbum)[]) => boolean
    clear: () => void
    mode: ESelectionMode
    setMode: Dispatch<SetStateAction<ESelectionMode>>
    lastAdded: TMedium | TAlbum
    shiftTargets: (TMedium | TAlbum)[]
    setShiftTargets: Dispatch<SetStateAction<(TMedium | TAlbum)[]>>
}
const SelectionContext = createContext<SelectionContext | null>(null)

const SelectionProvider = ({ children }: Props) => {
    const [selected, setSelected] = useState(new Set<TMedium | TAlbum>())
    const [mode, setMode] = useState(ESelectionMode.OFF)
    const [lastAdded, setLastAdded] = useState<TMedium | TAlbum>()
    const [shiftTargets, setShiftTargets] = useState<TMedium[] | TAlbum[]>([])

    const add = (items: TMedium | TAlbum | (TMedium | TAlbum)[]) => {
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

        if (newSet.size !== 0 && mode === ESelectionMode.OFF) {
            setMode(ESelectionMode.SELECT)
        }
    }

    const remove = (items: TMedium | TAlbum | (TMedium | TAlbum)[]) => {
        if (mode === ESelectionMode.SINGLE) {
            return
        }

        const itemsToRemove = Array.isArray(items) ? items : [items]
        const idsToRemove = itemsToRemove.map((i) => i.id)

        const newSet = new Set([...selected].filter((s) => {
            return !idsToRemove.includes(s.id)
        }))

        setSelected(newSet)
        setLastAdded(undefined)

        if (newSet.size === 0) {
            setMode(ESelectionMode.OFF)
        }
    }

    const toggle = (items: TMedium | TAlbum | (TMedium | TAlbum)[]) => {
        if (shift && mode === ESelectionMode.SELECT) {
            add(shiftTargets)
            setShiftTargets([])
        }
        else {
            const itemsToToggle = Array.isArray(items) ? items : [items]

            if (isSelected(itemsToToggle)) {
                remove(itemsToToggle)
            }
            else {
                add(itemsToToggle)
            }
        }
    }

    const isSelected = (items: TMedium | TAlbum | (TMedium | TAlbum)[]) => {
        const itemsToCheck = Array.isArray(items) ? items : [items]
        const selectedIds = [...selected].map((s) => s.id)
        return itemsToCheck.every((item) => selectedIds.includes(item.id))
    }

    const clear = () => {
        if (selected.size) {
            setSelected(new Set())
            setMode(ESelectionMode.OFF)
            setShiftTargets([])
            setLastAdded(undefined)
        }
    }

    const [shift, setShift] = useState(false)

    useKeyboard('keydown', 'Shift', () => {
        setShift(true)
    })

    useKeyboard('keyup', 'Shift', () => {
        setShift(false)
    })

    return <SelectionContext.Provider value={{
        shift,
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

const useSelectionContext = () => {
    return useContext(SelectionContext)
}
export {
    SelectionProvider, useSelectionContext
}
