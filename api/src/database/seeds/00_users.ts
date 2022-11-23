import { Knex } from 'knex'
import { predefinedUserUUIDs } from '../helpers/ids'
import UsersService from '../../services/users'
import { TUser } from '@photon/shared'

export async function seed (knex: Knex) {
    await knex('users').del()

    const usersService = new UsersService()

    const fakeUsers: Partial<TUser>[] = []

    for (let i = 0; i < 1; i++) {
        fakeUsers.push({
            id: predefinedUserUUIDs[i],
            firstName: 'Test',
            lastName: 'McTestface',
            mail: 'test@test.com',
            password: 'test'
        })
    }

    await usersService.createMany(fakeUsers)
}
