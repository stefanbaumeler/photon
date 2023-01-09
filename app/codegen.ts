import { getEnv } from './env'

const env = getEnv()

export default {
    overwrite: true,
    watch: true,
    schema: `${env.NEXT_PUBLIC_API_URL}`,
    documents: ['../**/*.gql'],
    config: {
        scalars: {
            TDate: Date
        }
    },
    generates: {
        './src/api/schema.ts': {
            plugins: [
                'typescript',
                'typescript-operations',
                'typescript-react-apollo'
            ],
            config: {
                preResolveTypes: false,
                maybeValue: 'Partial<T> | T | null',
                useTypeImports: true,
                withMutationFn: true,
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
