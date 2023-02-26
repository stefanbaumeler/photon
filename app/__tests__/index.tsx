import { ReactElement, ReactNode } from 'react'
import { render, RenderOptions } from '@testing-library/react'
import { MockedProvider } from '@apollo/client/testing'
import { I18nextProvider } from 'react-i18next'
import i18next from '../src/translations'

import { DetailsProvider,
    DialogProvider,
    EditProvider,
    LayoutProvider, SortProvider,
    NavProvider,
    ProviderProvider,
    SelectionProvider, SearchProvider } from '../src/providers'

interface Props {
    children: ReactNode
}

const TestProvider = (props: Props) => {
    const { children } = props

    return (
        <MockedProvider>
            <I18nextProvider i18n={i18next}>
                <ProviderProvider components={[NavProvider, DialogProvider, SelectionProvider, EditProvider, LayoutProvider, SortProvider, DetailsProvider, SearchProvider]}>
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
