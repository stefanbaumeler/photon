import { ReactElement, ReactNode } from 'react'
import { render, RenderOptions } from '@testing-library/react'
import { MockedProvider } from '@apollo/client/testing'
import { I18nextProvider } from 'react-i18next'
import i18next from '@/translations'

import { DetailsProvider,
    DialogProvider,
    EditProvider,
    LayoutProvider, MediaProvider,
    NavProvider,
    ProviderProvider,
    SelectionProvider } from '@/providers'

interface Props {
    children: ReactNode
}

const TestProvider = (props: Props) => {
    const { children } = props

    return (
        <MockedProvider>
            <I18nextProvider i18n={i18next}>
                <ProviderProvider components={[NavProvider, DialogProvider, SelectionProvider, EditProvider, LayoutProvider, MediaProvider, DetailsProvider]}>
                    {children}
                </ProviderProvider>
            </I18nextProvider>
        </MockedProvider>
    )
}

const customRender = (ui: ReactElement, options?: Omit<RenderOptions, 'wrapper'>) =>
    render(ui, {
        wrapper: TestProvider,
        ...options
    })

export * from '@testing-library/react'
export { customRender as render }
