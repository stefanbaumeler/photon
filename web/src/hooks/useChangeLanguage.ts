import { useMChangeLanguage } from '@photon/schema/dist/client'

export const useChangeLanguage = (language: string) => {
    const [, changeLanguage] = useMChangeLanguage()

    return () => {
        changeLanguage({
            language
        })
    }
}
