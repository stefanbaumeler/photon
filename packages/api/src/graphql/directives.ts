import { mapSchema, getDirective, MapperKind } from '@graphql-tools/utils'
import { GraphQLSchema } from 'graphql'
import { defaultFieldResolver } from 'graphql/execution'

export const authDirectiveTransformer = (schema: GraphQLSchema, directiveName: string) => {
    return mapSchema(schema, {
        [MapperKind.OBJECT_FIELD]: (fieldConfig) => {
            const authDirective = getDirective(schema, fieldConfig, directiveName)?.[0]

            if (authDirective) {
                const { resolve = defaultFieldResolver } = fieldConfig

                fieldConfig.resolve = async function (source, args, context, info) {
                    if (!context.user?.id) {
                        return []
                    }

                    return await resolve(source, args, context, info)
                }
                return fieldConfig
            }
        }
    })
}
