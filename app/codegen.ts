import { TranslationsGenerator } from '@photon/resources/translations'
import { ColorsGenerator } from '@photon/resources/colors'

TranslationsGenerator.generate({
    format: 'dart',
    outDir: './lib/l10n'
})

ColorsGenerator.generate({
    format: 'dart',
    out: './lib/settings/generated/colors.dart'
})
