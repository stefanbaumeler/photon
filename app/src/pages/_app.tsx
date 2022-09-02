import { ApolloProvider } from '@apollo/client'
import { NavProvider, ProviderProvider, DialogProvider, SelectionProvider } from '@/providers'
import { AppProps } from 'next/app'
import { client } from '@/api'
import { setDefaultLocale } from  'react-datepicker'

import 'react-datepicker/dist/react-datepicker.css'

// import tippy, { followCursor } from 'tippy.js'
//
// tippy.setDefaultProps({
//     theme: 'light',
//     plugins: [followCursor]
// })

import styles from '../styles/index.sass'

styles.length

setDefaultLocale('de-DE')

const AutoReplyApp = ({
    Component, pageProps
}: AppProps) => {
    return <ApolloProvider client={client}>
        <ProviderProvider components={[NavProvider, DialogProvider, SelectionProvider]}>
            <Component {...pageProps} />
        </ProviderProvider>
    </ApolloProvider>
}

export default AutoReplyApp
