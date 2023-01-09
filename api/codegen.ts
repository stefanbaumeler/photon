import { getEnv } from './env'

const env = getEnv()

export default {
    overwrite: true,
    watch: true,
    schema: `${parseInt(env.API_SECURE || '1', 10) ? 'https' : 'http'}://${env.API_HOST}:${env.API_PORT}/graphql`,
    documents: ['../**/*.gql'],
    config: {
        scalars: {
            TDate: Date
        }
    },
    generates: {
        './src/database/schema.ts': {
            plugins: [
                'typescript',
                'typescript-resolvers',
                {
                    add: {
                        content: 'import { FileUpload } from \'graphql-upload-minimal\''
                    }
                }
            ],
            config: {
                scalars: {
                    Upload: 'Promise<FileUpload>'
                },
                preResolveTypes: false,
                maybeValue: 'Partial<T> | T | null',
                useTypeImports: true,
                typesPrefix: 'T',
                addDocBlocks: true,
                dedupeFragments: true,
                omitOperationSuffix: true,
                namingConvention: {
                    typeNames: 'pascal-case#pascalCase',
                    transformUnderscore: true
                }
            }
        }
    }
}
