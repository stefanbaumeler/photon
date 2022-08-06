// import { Album } from '../types'
//
// export default class FileService {
//     constructor () {
//     }
//
//     async upload (album: Album) {
//         return this.knex.transaction(async (trx) => {
//             return trx.insert(album)
//                 .into(this.tableName)
//                 .returning('id')
//                 .then((result) => result[0].id)
//         })
//     }
// }
