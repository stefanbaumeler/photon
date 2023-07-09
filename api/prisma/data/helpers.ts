import { Prisma } from '@prisma/client'

export const connectIds = (ids: string[]) => {
    return {
        connect: ids.map((id) => {
            return {
                id
            }
        })
    }
}

export const connectId = (id: string) => {
    return {
        connect: {
            id
        }
    }
}

export const connectDefaultUser = () => {
    return {
        connect: {
            id: '51dde765-a6de-48c6-b372-41534fb91d55'
        }
    }
}

export const createTags = (labels: string[], idUser = '51dde765-a6de-48c6-b372-41534fb91d55'): Prisma.TagCreateNestedManyWithoutMediaInput => {
    return {
        connectOrCreate: labels.map((label) => {
            return {
                where: {
                    idUser_label: {
                        idUser,
                        label
                    }
                },
                create: {
                    idUser,
                    label
                }
            }
        })
    }
}
