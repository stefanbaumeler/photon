import { ApolloProvider } from '@apollo/client'
import { NavProvider } from '@/providers'
import { AppProps } from 'next/app'
import { client } from '@/api'
import { setDefaultLocale } from  'react-datepicker'
import DialogProvider from '@/providers/DialogProvider'

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
        <DialogProvider>
            <NavProvider>
                <Component {...pageProps} />
            </NavProvider>
        </DialogProvider>
    </ApolloProvider>
}

export default AutoReplyApp
