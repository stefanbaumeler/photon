module.exports = {
    overwrite: true,
    schema: 'http://localhost:2000/graphql',
    documents: '../**/*.{gql,graphql}',
    generates: {
        './schema.ts': {
            plugins: [
                'typescript',
                'typescript-resolvers',
                'typescript-operations',
                'typescript-react-apollo',
                // 'typescript-document-nodes',
                // 'fragment-matcher'
            ],
            config: {
                preResolveTypes: false,
                maybeValue: 'Partial<T> | T | null',
                useTypeImports: true,
                withMutationFn: true,
                typesPrefix: 'T',
                addDocBlocks: false,
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
