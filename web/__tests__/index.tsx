import { ReactElement, ReactNode } from 'react'
import { render, RenderOptions } from '@testing-library/react'
import { I18nextProvider } from 'react-i18next'
import i18next from '../src/translations'
import { Provider } from 'urql'
import { initializeUrqlClient } from '@/api'

import { DetailsProvider,
    DialogProvider,
    EditProvider,
    LayoutProvider,
    SortProvider,
    NavProvider,
    ProviderProvider,
    SelectionProvider,
    DragProvider,
    KeyboardProvider,
    UserProvider } from '../src/providers'

interface Props {
    children: ReactNode
}

const TestProvider = (props: Props) => {
    const { children } = props

    return (
        <Provider value={initializeUrqlClient()}>
            <I18nextProvider i18n={i18next}>
                <ProviderProvider components={[
                    UserProvider,
                    KeyboardProvider,
                    DialogProvider,
                    SelectionProvider,
                    DragProvider,
                    NavProvider,
                    EditProvider,
                    LayoutProvider,
                    SortProvider,
                    DetailsProvider
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
