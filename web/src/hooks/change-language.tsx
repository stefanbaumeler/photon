import { useMChangeLanguage } from '@photon/schema'

const useChangeLanguage = (language: string) => {
    const [, changeLanguage] = useMChangeLanguage()

    return () => {
        changeLanguage({
            language
        })
    }
}

export default useChangeLanguage
