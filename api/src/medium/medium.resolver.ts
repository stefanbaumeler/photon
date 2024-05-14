import { Query, Resolver, Args, Mutation } from '@nestjs/graphql'
import { MediumService } from './medium.service'
import { Medium, FlatMedium } from './medium.model'
import { MediumDownloadDto,
    MediumCountDto,
    MediumUpdateDto,
    MediumUpdateManyDto,
    MediumFilterDto, MediumRotateDto } from './medium.dto'
import { IdDto, IdsDto } from '../shared/dto'
import { UploadService } from '../upload/upload.service'

@Resolver(() => Medium)
export class MediumResolver {
    constructor (private readonly service: MediumService, private readonly uploadService: UploadService) { }

    @Query(() => [Medium])
    async media (@Args() dto: MediumFilterDto) {
        return await this.service.getAll(dto)
    }

    @Query(() => Medium)
    async medium (@Args() dto: IdDto) {
        return this.service.getById(dto)
    }

    @Query(() => [Medium])
    async archive () {
        return this.service.getArchive()
    }

    @Query(() => [Medium])
    async trash () {
        return this.service.getTrash()
    }

    @Query(() => MediumDownloadDto)
    async download (@Args() dto: IdsDto) {
        return this.service.download(dto)
    }

    @Query(() => MediumCountDto)
    async countMediaByYear () {
        return this.service.countByYear()
    }

    @Mutation(() => [FlatMedium])
    async emptyTrash () {
        return this.service.emptyTrash()
    }

    @Mutation(() => [FlatMedium])
    async deleteMedia (@Args() dto: IdsDto) {
        return this.service.delete(dto)
    }

    @Mutation(() => FlatMedium)
    async updateMedium (@Args() dto: MediumUpdateDto) {
        return this.service.update(dto)
    }

    @Mutation(() => [FlatMedium])
    async updateMedia (@Args() dto: MediumUpdateManyDto) {
        return this.service.updateMany(dto)
    }

    @Mutation(() => FlatMedium)
    async rotateMedium (@Args() dto: MediumRotateDto) {
        return this.service.rotate(dto)
    }
}
