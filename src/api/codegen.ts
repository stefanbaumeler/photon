
import dotenv from 'dotenv'
import { GraphQLUpload } from 'graphql-upload-minimal'
import { DateTimeScalar } from 'graphql-date-scalars'

dotenv.config({
    path: process.env.NODE_ENV ? `.env.${process.env.NODE_ENV}` : '.env'
})

export default {
    overwrite: true,
    watch: true,
    schema: `${parseInt(process.env.API_SECURE || '1', 10) ? 'https' : 'http'}://${process.env.API_HOST}:${process.env.API_PORT}/graphql`,
    documents: ['../**/*.gql', '../**/*.gql'],
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
