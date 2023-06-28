import { getEnv } from './api/env'

const env = getEnv()

export default {
    overwrite: true,
    watch: true,
    schema: `${parseInt(env.API_SECURE || '1', 10) ? 'https' : 'http'}://${env.API_HOST}:${env.API_PORT}/graphql`,
    documents: ['**/*.gql'],
    config: {
        scalars: {
            TDate: Date
        }
    },
    generates: {
        './packages/schema/index.ts': {
            plugins: [
                'typescript',
                'typescript-resolvers',
                'typescript-operations',
                'typescript-react-apollo',
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
