import { createContext, ReactNode, useContext, useEffect, useState } from 'react'
import { DetailsContext, SelectionContext } from '@/providers'
import { EActionLocation } from '@/types/app'
import { IconButton } from '@/components'

type Props = {
    children?: ReactNode
}

type Action = {
    id: string
    label: string
    href?: string
    callback?: () => void
    locations: EActionLocation[]
    extended?: boolean
    icon: string | (() => string)
}

interface ActionContext {
    actions: Action[]
    register: (action: Action) => void
    ofLocation: (location: EActionLocation) => Action[]
    get: (id: string) => Action
    render: (location: EActionLocation) => JSX.Element
}

const ActionContext = createContext<ActionContext | null>(null)

const ActionProvider = ({ children }: Props) => {
    const [register, setRegister] = useState((() => {}) as () => (action: Action) => void)
    const selection = useContext(SelectionContext)
    const details = useContext(DetailsContext)

    useEffect(() => {
        const r = (action: Action) => {
            const existing = actions.find((a) => a.id === action.id)
            const newActions = actions

            if (existing) {
                const index = newActions.indexOf(existing)

                newActions[index] = action
            }
            else {
                newActions.push(action)
            }
            setActions(newActions)
        }

        setRegister(() => r)
    }, [selection.selected, details.active])

    const ofLocation = (location: EActionLocation) => {
        return actions.filter((action) => action.locations.includes(location))
    }

    const get = (id: string) => {
        return actions.find((action) => action.id = id)
    }

    const render = (location: EActionLocation) => {
        return <>
            {ofLocation(location).map((action, k) => {
                return <IconButton
                    key={k}
                    href={action.href}
                    onClick={action.callback}
                    hint={action.label}
                    white={true}
                    icon={action.icon}
                />
            })}
        </>
    }

    const [actions, setActions] = useState<Action[]>([])

    return <ActionContext.Provider value={{
        actions,
        register,
        ofLocation,
        get,
        render
    }}
    >
        {children}
    </ActionContext.Provider>
}

export {
    ActionProvider, ActionContext
}
