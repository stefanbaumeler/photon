import type { user } from '../../../src/drizzle/schema'
export const usersData: typeof user.$inferInsert[] = [
    {
        id: '51dde765-a6de-48c6-b372-41534fb91d55',
        dateCreated: '2022-11-10 23:00:00+00',
        dateModified: '2022-11-10 23:00:00+00',
        mail: 'test@test.com',
        password: '$argon2id$v=19$m=65536,t=3,p=4$jIw2VMLJrnHEUw8yMW52ug$Fz9Zeci/TsP1+OE9WVrsEMsDxfFaoIqAheVYG0WwVSA',
        firstName: 'Test',
        lastName: 'McTestFace',
        language: 'de-DE'
    }
]
