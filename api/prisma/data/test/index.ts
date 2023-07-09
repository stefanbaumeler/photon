import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

import { users } from './users'
import { media } from './media'
import { albums } from './albums'

export default async () => {
    await prisma.user.deleteMany()
    await prisma.$transaction(
        users.map((user) => {
            return prisma.user.create({
                data: user
            })
        })
    )

    await prisma.medium.deleteMany()
    await prisma.$transaction(
        media.map((medium) => {
            return prisma.medium.create({
                data: medium
            })
        })
    )

    await prisma.album.deleteMany()
    await prisma.$transaction(
        albums.map((album) => {
            return prisma.album.create({
                data: album
            })
        })
    )
}
