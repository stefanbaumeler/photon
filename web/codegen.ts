import { TranslationsGenerator } from '@photon/resources/translations'
import { ColorsGenerator } from '@photon/resources/colors'

TranslationsGenerator.generate({
    format: 'ts',
    outDir: './src/translations/generated'
})

ColorsGenerator.generate({
    format: 'scss',
    out: './src/styles/generated/colors.scss'
})
