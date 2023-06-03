import { ApolloProvider } from '@apollo/client'
import { NavProvider,
    ProviderProvider,
    DialogProvider,
    SelectionProvider,
    EditProvider,
    LayoutProvider,
    SortProvider,
    SearchProvider,
    DragProvider } from '../providers'
import { AppProps } from 'next/app'
import { client } from 'web/src/api'
import { setDefaultLocale } from  'react-datepicker'
import i18next from '../translations'
import tauri from '../tauri'
import tippy, { followCursor }  from 'tippy.js'
import '../styles/index.scss'
import { I18nextProvider } from 'react-i18next'
import 'react-datepicker/dist/react-datepicker.css'
import 'tippy.js/themes/light.css'
import { InstantSearch } from 'react-instantsearch-hooks-web'
import { typesenseAdapter } from 'web/src/api/search'
import { SearchSetup } from 'web/src/components'

tippy.setDefaultProps({
    zIndex: 101,
    plugins: [followCursor]
})

tauri.createBaseDir()

setDefaultLocale('en-US')

const Photon = ({
    Component, pageProps
}: AppProps) => {
    return <ApolloProvider client={client}>
        <I18nextProvider i18n={i18next}>
            <InstantSearch
                searchClient={typesenseAdapter.searchClient}
                indexName="media"
            >
                <SearchSetup />
                <ProviderProvider components={[SearchProvider, DialogProvider, SelectionProvider, DragProvider, NavProvider, EditProvider, LayoutProvider, SortProvider]}>
                    <Component {...pageProps} />
                </ProviderProvider>
            </InstantSearch>
        </I18nextProvider>
    </ApolloProvider>
}

export default Photon
