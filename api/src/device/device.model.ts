import { Field, ObjectType } from '@nestjs/graphql'
import { User } from '../user/user.model'
@ObjectType()
export class Device {
    @Field(() => String!)
        id!: string

    @Field(() => Date!)
        dateCreated!: Date

    @Field(() => Date!)
        dateModified!: Date

    @Field(() => [User!])
        users!: User[]

    @Field(() => String!)
        name!: string

    @Field(() => String!)
        title!: string
}
