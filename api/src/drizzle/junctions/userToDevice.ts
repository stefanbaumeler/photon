import { pgTable, primaryKey, uuid } from 'drizzle-orm/pg-core'
import { relations } from 'drizzle-orm'
import { userSchema } from '../../user/user.schema'
import { deviceSchema } from '../../device/device.schema'

export const userToDevice = pgTable(
    'user_to_device',
    {
        idUser: uuid('id_user'),
        idDevice: uuid('id_device')
    },
    (t) => ({
        pk: primaryKey({
            columns: [t.idUser, t.idDevice]
        })
    })
)

export const userToDeviceRelations = relations(userToDevice, ({ one }) => ({
    user: one(userSchema, {
        fields: [userToDevice.idUser],
        references: [userSchema.id]
    }),
    device: one(deviceSchema, {
        fields: [userToDevice.idDevice],
        references: [deviceSchema.id]
    })
}))
