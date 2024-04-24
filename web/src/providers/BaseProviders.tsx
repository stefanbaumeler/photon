'use client'
import { urqlClient, urqlSsrExchange } from '@/api'
import i18next from '@/translations'
import { HotkeysProvider } from 'react-hotkeys-hook'
import { I18nextProvider } from 'react-i18next'
import { ReactNode } from 'react'
import { ProviderProvider } from '@/providers/ProviderProvider'
import { SelectionProvider } from '@/providers/SelectionProvider'
import { DragProvider } from '@/providers/DragProvider'
import { NavProvider } from '@/providers/NavProvider'
import { EditProvider } from '@/providers/EditProvider'
import { LayoutProvider } from '@/providers/LayoutProvider'
import { SortProvider } from '@/providers/SortProvider'
import { UrqlProvider } from '@urql/next'
import { RotationProvider } from '@/providers/RotationProvider'

type Props = {
    children: ReactNode
}

export const BaseProviders = ({ children }: Props) => {
    return <>
        <UrqlProvider
            client={urqlClient}
            ssr={urqlSsrExchange}
        >
            <I18nextProvider i18n={i18next}>
                <HotkeysProvider>
                    <ProviderProvider components={[
                        SelectionProvider,
                        DragProvider,
                        NavProvider,
                        EditProvider,
                        LayoutProvider,
                        SortProvider,
                        RotationProvider
                    ]}
                    >
                        {children}
                    </ProviderProvider>
                </HotkeysProvider>
            </I18nextProvider>
        </UrqlProvider>
    </>
}
