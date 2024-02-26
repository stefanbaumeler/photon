import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useState } from 'react'
import { ESelectionMode } from '@/types/app'
import { useKeyboard } from '@/hooks'
import { useRouter } from 'next/router'

type Props = {
    children?: ReactNode
}

interface SelectionContext {
    shift: boolean
    selected: Set<string>
    add: (items: string | string[]) => void
    remove: (items: string | string[]) => void
    toggle: (items: string | string[]) => void
    isSelected: (media: string | string[]) => boolean
    clear: () => void
    mode: ESelectionMode
    setMode: Dispatch<SetStateAction<ESelectionMode>>
    lastAdded: string
    shiftTargets: string[]
    setShiftTargets: Dispatch<SetStateAction<string[]>>
}
const SelectionContext = createContext<SelectionContext | null>(null)

const SelectionProvider = ({ children }: Props) => {
    const [selected, setSelected] = useState(new Set<string>())
    const [mode, setMode] = useState(ESelectionMode.OFF)
    const [lastAdded, setLastAdded] = useState<string>()
    const [shiftTargets, setShiftTargets] = useState<string[]>([])
    const [shift, setShift] = useState(false)
    const router = useRouter()

    useKeyboard('keydown', 'Shift', () => {
        setShift(true)
    })

    useKeyboard('keyup', 'Shift', () => {
        setShift(false)
    })

    return <SelectionContext.Provider value={{
        shift,
        selected,
        mode,
        setMode,
        lastAdded,
        shiftTargets,
        setShiftTargets,
        add (items) {
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
                setMode(router.pathname.endsWith('/albums') ? ESelectionMode.ALBUMS : ESelectionMode.SELECT)
            }
        },
        remove (items) {
            if (mode === ESelectionMode.SINGLE) {
                return
            }

            const itemsToRemove = Array.isArray(items) ? items : [items]

            const newSet = new Set([...selected].filter((item) => {
                return !itemsToRemove.includes(item)
            }))

            setSelected(newSet)
            setLastAdded(undefined)

            if (newSet.size === 0) {
                setMode(ESelectionMode.OFF)
            }
        },
        toggle (items) {
            if (shift && mode === ESelectionMode.SELECT) {
                this.add(shiftTargets)
                setShiftTargets([])
            }
            else {
                const itemsToToggle = Array.isArray(items) ? items : [items]

                if (this.isSelected(itemsToToggle)) {
                    this.remove(itemsToToggle)
                }
                else {
                    this.add(itemsToToggle)
                }
            }
        },
        isSelected (items) {
            const itemsToCheck = Array.isArray(items) ? items : [items]
            return itemsToCheck.every((item) => [...selected].includes(item))
        },
        clear () {
            if (selected.size || mode === ESelectionMode.DELETE) {
                setSelected(new Set())
                setMode(ESelectionMode.OFF)
                setShiftTargets([])
                setLastAdded(undefined)
            }
        }
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
