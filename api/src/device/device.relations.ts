import { relations } from 'drizzle-orm'
import { deviceSchema } from './device.schema'
import { userToDevice } from '../drizzle/junctions/userToDevice'

export const deviceRelations = relations(deviceSchema, ({ many }) => ({
    users: many(userToDevice)
}))
