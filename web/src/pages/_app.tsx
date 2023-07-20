import { NavProvider,
    ProviderProvider,
    DialogProvider,
    SelectionProvider,
    EditProvider,
    LayoutProvider,
    SortProvider,
    SearchProvider,
    DragProvider,
    KeyboardProvider,
    UserProvider } from '@/providers'
import { AppProps } from 'next/app'
import { initializeUrqlClient } from '@/api'
import { setDefaultLocale } from  'react-datepicker'
import i18next from '@/translations'
import tauri from '@/tauri'
import tippy, { followCursor }  from 'tippy.js'
import '@/styles/index.scss'
import { I18nextProvider } from 'react-i18next'
import 'react-datepicker/dist/react-datepicker.css'
import 'tippy.js/themes/light.css'
import { Provider } from 'urql'

tippy.setDefaultProps({
    zIndex: 101,
    plugins: [followCursor]
})

tauri.createBaseDir()

setDefaultLocale('en-US')

const Photon = ({
    Component, pageProps
}: AppProps) => {
    return <Provider value={initializeUrqlClient()}>
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
                SortProvider
            ]}
            >
                <SearchProvider>
                    <Component {...pageProps} />
                </SearchProvider>
            </ProviderProvider>
        </I18nextProvider>
    </Provider>
}

export default Photon
