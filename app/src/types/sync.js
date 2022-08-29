module.exports = {
    overwrite: true,
    schema: 'http://localhost:2000/graphql',
    documents: '**/*.{gql,graphql}',
    generates: {
        './src/types/api.ts': {
            plugins: [
                'typescript',
                // 'typescript-resolvers',
                'typescript-operations',
                'typescript-react-apollo'
                // 'typescript-document-nodes',
                // 'fragment-matcher'
            ],
            config: {
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
