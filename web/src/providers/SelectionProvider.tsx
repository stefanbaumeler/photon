import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useEffect, useState } from 'react'
import { EKeyboardScope, ESelectionMode } from '@/types/app'
import { usePathname } from 'next/navigation'
import { useHotkeysContext } from 'react-hotkeys-hook'
import { useHotkey } from '@/hooks/hotkey'
import bem from '@/util/bem'
import { useMediumFromRouter } from '@/hooks/useMediumFromRouter'

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
    lastAdded?: string
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
    const pathname = usePathname()
    const { id } = useMediumFromRouter()

    const clear = () => {
        if (selected.size || mode === ESelectionMode.DELETE) {
            setSelected(new Set())
            setMode(ESelectionMode.OFF)
            setShiftTargets([])
            setLastAdded(undefined)
            setMode(ESelectionMode.OFF)
        }
    }

    const {
        enableScope, disableScope
    } = useHotkeysContext()

    useEffect(() => {
        if (mode === ESelectionMode.OFF) {
            disableScope(EKeyboardScope.select)
        }
        else {
            enableScope(EKeyboardScope.select)
        }
    }, [mode, disableScope, enableScope])

    useHotkey({
        key: 'Escape',
        callback: () => {
            if (!id) {
                clear()
            }
        },
        scopes: EKeyboardScope.select
    })

    useHotkey({
        key: 'Shift',
        callback: () => {
            setShift(true)
        },
        scopes: EKeyboardScope.select
    })

    useHotkey({
        key: 'Shift',
        callback: () => {
            setShift(false)
        },
        keyup: true,
        scopes: EKeyboardScope.select
    })

    const classes = bem('selection-state', [
        ['selecting', mode !== ESelectionMode.OFF]
    ])

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

            if (lastAdded && itemsToAdd.indexOf(lastAdded) === itemsToAdd.length - 1) {
                setLastAdded(itemsToAdd[0])
            }
            else {
                setLastAdded(itemsToAdd[itemsToAdd.length - 1])
            }

            if (newSet.size !== 0 && mode === ESelectionMode.OFF) {
                setMode(pathname.endsWith('/albums') ? ESelectionMode.ALBUMS : ESelectionMode.SELECT)
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
        <div className={classes}>
            {children}
        </div>
    </SelectionContext.Provider>
}

const useSelectionContext = () => {
    const ctx = useContext(SelectionContext)

    if (!ctx) {
        throw new Error('Context not defined')
    }

    return ctx
}

export {
    SelectionProvider, useSelectionContext
}
