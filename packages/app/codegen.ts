import dotenv from 'dotenv'

dotenv.config({
    path: process.env.NODE_ENV ? `.env.${process.env.NODE_ENV}` : '.env'
})

export default {
    overwrite: true,
    schema: `${process.env.NEXT_PUBLIC_API_URL}`,
    documents: ['../**/*.gql', '../**/*.gql'],
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
