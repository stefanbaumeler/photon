import { NavProvider,
    ProviderProvider,
    SelectionProvider,
    EditProvider,
    LayoutProvider,
    SortProvider,
    SearchProvider,
    DragProvider,
    DetailsProvider } from '@/providers'
import { AppProps } from 'next/app'
import { urqlClient } from '@/api'
import { setDefaultLocale } from  'react-datepicker'
import i18next from '@/translations'
import tauri from '@/tauri'
import tippy, { followCursor }  from 'tippy.js'
import '@/styles/index.scss'
import { I18nextProvider } from 'react-i18next'
import 'react-datepicker/dist/react-datepicker.css'
import 'tippy.js/themes/light.css'
import { Provider } from 'urql'
import { HotkeysProvider } from 'react-hotkeys-hook'

tippy.setDefaultProps({
    zIndex: 101,
    plugins: [followCursor]
})

tauri.createBaseDir()

setDefaultLocale('en-US')

const Photon = ({
    Component, pageProps
}: AppProps) => {
    return <Provider value={urqlClient}>
        <I18nextProvider i18n={i18next}>
            <HotkeysProvider>
                <ProviderProvider components={[
                    SelectionProvider,
                    DragProvider,
                    NavProvider,
                    EditProvider,
                    LayoutProvider,
                    SortProvider,
                    DetailsProvider,
                    SearchProvider
                ]}
                >
                    <Component {...pageProps} />
                </ProviderProvider>
            </HotkeysProvider>
        </I18nextProvider>
    </Provider>
}

export default Photon
