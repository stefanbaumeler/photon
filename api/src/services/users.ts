import { Knex } from 'knex'

export default class UsersService {
    knex: Knex

    tableName = 'users'

    constructor (knex: Knex) {
        this.knex = knex
    }

    async createOne () {
        return this.knex.insert({
            filenameDisk: '123232123123.jpg',
            filenameDownload: 'foobar.jpg',
            title: 'foobar',
            description: ''
        })
            .into(this.tableName)
            .returning('id')
            .then((result) => result[0])
    }

    async readOne (key: number) {
        return this.knex.from(this.tableName).select().where({
            id: key
        })
    }
}
