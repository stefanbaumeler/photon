import { ReactElement, ReactNode } from 'react'
import { render, RenderOptions } from '@testing-library/react'
import { I18nextProvider } from 'react-i18next'
import i18next from '../src/translations'
import { Provider } from 'urql'
import { urqlClient } from '@/api'
import { NavProvider } from '@/providers/NavProvider'
import { ProviderProvider } from '@/providers/ProviderProvider'
import { SelectionProvider } from '@/providers/SelectionProvider'
import { DragProvider } from '@/providers/DragProvider'
import { EditProvider } from '@/providers/EditProvider'
import { LayoutProvider } from '@/providers/LayoutProvider'
import { SortProvider } from '@/providers/SortProvider'

interface Props {
    children: ReactNode
}

const TestProvider = (props: Props) => {
    const { children } = props

    return (
        <Provider value={urqlClient}>
            <I18nextProvider i18n={i18next}>
                <ProviderProvider components={[
                    SelectionProvider,
                    DragProvider,
                    NavProvider,
                    EditProvider,
                    LayoutProvider,
                    SortProvider
                ]}
                >
                    {children}
                </ProviderProvider>
            </I18nextProvider>
        </Provider>
    )
}

const customRender = (ui: ReactElement, options?: Omit<RenderOptions, 'wrapper'>) =>
    render(ui, {
        wrapper: TestProvider,
        ...options
    })

export * from '@testing-library/react'
export { customRender as render }
