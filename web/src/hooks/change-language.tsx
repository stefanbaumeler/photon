import { useMChangeLanguage } from '@photon/schema'

export const useChangeLanguage = (language: string) => {
    const [, changeLanguage] = useMChangeLanguage()

    return () => {
        changeLanguage({
            language
        })
    }
}
