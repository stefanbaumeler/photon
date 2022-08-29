import { ApolloProvider } from '@apollo/client'
import { NavProvider } from '@/providers'
import { AppProps } from 'next/app'
import { client } from '@/api'
import { setDefaultLocale } from  'react-datepicker'

// import 'tippy.js/dist/tippy.css'
// import 'tippy.js/themes/light.css'
import 'react-datepicker/dist/react-datepicker.css'

// import tippy, { followCursor } from 'tippy.js'
// import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'

// ChartJS.register(ArcElement, Tooltip, Legend)

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
        <NavProvider>
            <Component {...pageProps} />
        </NavProvider>
    </ApolloProvider>
}

export default AutoReplyApp
