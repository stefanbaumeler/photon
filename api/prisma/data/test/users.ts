import type { user } from '../../../src/drizzle/schema'

export const usersData: typeof user.$inferInsert[] = [
    {
        id: '51dde765-a6de-48c6-b372-41534fb91d55',
        dateCreated: '2022-11-10 23:00:00+00',
        dateModified: '2022-11-10 23:00:00+00',
        mail: 'test@test.com',
        password: '$argon2id$v=19$m=65536,t=3,p=4$+p2e5v9GTqWN8axjGpEYfQ$gaDJinL+AB1j7T3ky6wANHiRHChysGMEFKlolJvc8/k',
        firstName: 'Test',
        lastName: 'McTestFace',
        language: 'de-DE'
    }
]
