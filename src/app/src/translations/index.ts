import i18next from 'i18next'
import { initReactI18next } from 'react-i18next'
import translationsEn from '@/translations/en'
import translationsDe from '@/translations/de'

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

export default i18next
