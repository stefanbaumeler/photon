import fs from 'fs'
import path from 'path'
import glob from 'glob'

type TModule = {
    [key: string]: string
}

export class TranslationsGenerator {
    private static ts = (outDir: string) => {
        fs.cpSync(path.join(__dirname, '/data'), outDir, {
            recursive: true
        })
    }

    private static dart = async (outDir: string) => {
        const modules = await new Promise<{ [key: string]: TModule }>((resolve) => glob(__dirname + '/data/*.ts', async (err, res) => {
            const files = await Promise.all(
                res.map((file) => {
                    return import(file.replace(__dirname, '.').replace('.ts', ''))
                })
            )

            const m: { [key: string]: TModule } = {}

            files.forEach((module, key) => {
                const split = res[key].split('.')[0].split('/')

                m[split[split.length - 1]] = module.default
            })

            resolve(m)
        }))

        Object.keys(modules).forEach((module) => {
            let out = '{\n'
            const keys = Object.keys(modules[module])
            keys.forEach((key, k) => {
                const value = modules[module][key]
                    .replace(/{{/g, '{')
                    .replace(/}}/g, '}')
                    .replace(', lowercase}', '}')
                out += `    "${key}": "${value}"${k === keys.length - 1 ? '' : ',' }\n`
            })

            out += '}'

            fs.writeFileSync(`${outDir}/app_${module}.arb`, out)
        })
    }

    static generate = ({
        format, outDir
    }: { format: 'ts' | 'dart', outDir: string }) => {
        if (format === 'ts') {
            return this.ts(outDir)
        }

        if (format === 'dart') {
            return this.dart(outDir)
        }
    }
}
