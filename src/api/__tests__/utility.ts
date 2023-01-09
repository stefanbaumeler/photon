import express from 'express'
import { predefinedUserUUIDs } from '../src/database/helpers/ids'
import { VariableValues } from '@apollo/server/dist/esm/externalTypes/graphql'
import { DocumentNode } from 'graphql/language'
import { strict as assert } from 'assert'
import { getApollo } from '../src/app'

const app = express()
const apollo = getApollo(app)

const context = {
    contextValue: {
        user: {
            id: predefinedUserUUIDs[0]
        },
        res: {
            cookie: (name: string, token: string, options: Record<string, unknown>) => { /* */ },
            clearCookie: (cookie: string) => { /* */ }
        }
    }
}

export const useTestQuery = async <TData, TVariables extends VariableValues = VariableValues>(queryDocument: DocumentNode, variables?: TVariables) => {
    const query = await apollo.executeOperation<TData, TVariables>({
        query: queryDocument,
        variables
    }, context)

    assert(query.body.kind === 'single')

    // expect(query.body.singleResult.errors).toBeUndefined()

    return query as typeof query & { body: { kind: 'single' }}
}
