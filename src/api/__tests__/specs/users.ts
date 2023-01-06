import * as Schema from '@photon/app/src/api'
import { seed } from '../../src/database/seeds/jest'
import { expect, describe, beforeEach } from '@jest/globals'
import { useTestQuery } from '../utility'

beforeEach(async () => {
    await seed()
})

it('can sign in', async () => {
    const query = await useTestQuery<Schema.TMSignIn, Schema.TMSignInVariables>(Schema.MSignInDocument, {
        mail: 'test@test.com',
        password: 'test'
    })

    expect(query.body.singleResult.data?.signIn).toMatchSnapshot({
        accessToken: expect.any(String)
    })
})

it('can sign out', async () => {
    const query = await useTestQuery<Schema.TMSignOut, Schema.TMSignOutVariables>(Schema.MSignOutDocument)

    expect(query.body.singleResult.data?.signOut).toMatchSnapshot()
})

it('can sign up', async () => {
    const query = await useTestQuery<Schema.TMSignUp, Schema.TMSignUpVariables>(Schema.MSignUpDocument, {
        mail: 'created@created.com',
        password: 'created',
        firstName: 'first',
        lastName: 'last'
    })

    expect(query.body.singleResult.data?.signUp).toMatchSnapshot({
        accessToken: expect.any(String)
    })
})
