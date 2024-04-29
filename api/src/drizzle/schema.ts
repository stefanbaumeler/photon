import { albumSchema } from '../album/album.schema'
import { mediumSchema } from '../medium/medium.schema'
import { favoriteSchema } from '../favorite/favorite.schema'
import { userSchema } from '../user/user.schema'
import { deviceSchema } from '../device/device.schema'
import { tagSchema } from '../tag/tag.schema'

export const album = albumSchema
export const medium = mediumSchema
export const favorite = favoriteSchema
export const user = userSchema
export const device = deviceSchema
export const tag = tagSchema

export * from './junctions/mediumToAlbum'
export * from './junctions/mediumToTag'
export * from './junctions/userToDevice'

export * from '../album/album.relations'
export * from '../medium/medium.relations'
export * from '../favorite/favorite.relations'
export * from '../user/user.relations'
export * from '../device/device.relations'
export * from '../tag/tag.relations'
