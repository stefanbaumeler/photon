import fs from 'fs'
import colors from './data'

export class ColorsGenerator {
    private static dart = (outDir: string) => {
        let out = 'import \'package:flutter/material.dart\';\n\n@immutable\nclass AppColors {\n'

        Object.keys(colors).forEach((key) => {
            out = `${out}  final ${key} = const Color(0xFF${colors[key]});\n`
        })

        out = `${out}}`

        fs.writeFileSync(outDir, out)
    }

    private static scss = (outDir: string) => {
        const toKebab = (str: string) => str.replace(
            /[A-Z]+(?![a-z])|[A-Z]/g,
            (s, ofs) => (ofs ? '-' : '') + s.toLowerCase())

        let out = ''

        Object.keys(colors).forEach((key) => {
            out = `${out}$color-${toKebab(key)}: #${colors[key]};\n`
        })

        fs.writeFileSync(outDir, out)
    }
    static generate = ({
        format, out
    }: { format: 'dart' | 'scss', out: string }) => {
        if (format === 'dart') {
            this.dart(out)
        }

        if (format === 'scss') {
            this.scss(out)
        }
    }
}
