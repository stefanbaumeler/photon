import { ApolloProvider } from '@apollo/client'
import { NavProvider, ProviderProvider, DialogProvider, SelectionProvider, EditProvider } from '@/providers'
import { AppProps } from 'next/app'
import { client } from '@/api'
import { setDefaultLocale } from  'react-datepicker'
import i18next from 'i18next'
import { initReactI18next } from 'react-i18next'
import translationsDe from '@/translations/de'
import translationsEn from '@/translations/en'

import 'react-datepicker/dist/react-datepicker.css'

import 'tippy.js/themes/light.css'

import tippy  from 'tippy.js'

tippy.setDefaultProps({
    zIndex: 101
})

import styles from '../styles/index.scss'

styles.length

setDefaultLocale('en-US')

i18next.use(initReactI18next).init({
    resources: {
        en: {
            translation: translationsEn
        },
        de: {
            translation: translationsDe
        }
    },
    lng: 'de',
    fallbackLng: 'en',
    interpolation: {
        format: (value, format) => {
            if (format === 'uppercase') {
                return value.toUpperCase()
            }
            if (format === 'lowercase') {
                return value.toLowerCase()
            }
            if (format === 'capitalize') {
                return `${value.substring(0, 1).toUpperCase()}${value.slice(1)}`
            }

            return value
        }
    }
})

const Picchu = ({
    Component, pageProps
}: AppProps) => {
    return <ApolloProvider client={client}>
        <ProviderProvider components={[NavProvider, DialogProvider, SelectionProvider, EditProvider]}>
            <Component {...pageProps} />
        </ProviderProvider>
    </ApolloProvider>
}

export default Picchu
