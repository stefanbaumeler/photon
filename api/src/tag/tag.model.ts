import { TTag } from '@photon/schema'
import { Field, InputType, ObjectType } from '@nestjs/graphql'
@ObjectType()
export class Tag {
    @Field(() => String)
        id!: TTag['id']

    @Field(() => String)
        label!: TTag['label']

    @Field(() => String)
        source!: TTag['source']

    @Field(() => String)
        idUser!: TTag['idUser']
}
