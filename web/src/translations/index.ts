import i18next from 'i18next'
import { initReactI18next } from 'react-i18next'
import commonEn from './generated/en/common'
import commonDe from './generated/de/common'
import listHeadersEn from './generated/en/list-headers'
import listHeadersDe from './generated/de/list-headers'

i18next.use(initReactI18next).init({
    ns: ['index', 'listHeaders'],
    defaultNS: 'index',
    resources: {
        en: {
            index: commonEn,
            listHeadersEn: listHeadersEn
        },
        de: {
            index: commonDe,
            listHeaders: listHeadersDe
        }
    },
    lng: 'en-US',
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

export default i18next
