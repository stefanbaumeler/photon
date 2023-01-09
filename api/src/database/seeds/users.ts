import { predefinedUserUUIDs } from '../helpers/ids'
import UsersService from '../../services/users'
import { TUser } from '../schema'

export default async (truncateOnly = false) => {
    const service = new UsersService()

    await service.truncate()

    if (truncateOnly) {
        return
    }

    const fakeUsers: Pick<TUser, 'id' | 'firstName' | 'lastName' | 'mail' | 'password' | 'dateCreated' | 'dateModified'>[] = []

    for (let i = 0; i < 1; i++) {
        fakeUsers.push({
            id: predefinedUserUUIDs[i],
            dateCreated: new Date('2022-11-11 00:00:00'),
            dateModified: new Date('2022-11-11 00:00:00'),
            firstName: 'Test',
            lastName: 'McTestface',
            mail: 'test@test.com',
            password: 'test'
        })
    }

    await service.createMany(fakeUsers)
}
