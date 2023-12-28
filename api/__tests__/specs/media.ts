import request from 'supertest'
import { Test } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'
import { MediumModule } from '../../src/medium/medium.module'
import { MediumService } from '../../src/medium/medium.service'
import { AppModule } from '../../src/app/app.module'
import { ConfigService } from '@nestjs/config'

describe('Cats', () => {
    let app: INestApplication
    const mediumService = {
        findAll: () => ['test']
    }

    beforeAll(async () => {
        const moduleRef = await Test.createTestingModule({
            imports: [AppModule]
        }).compile()

        app = moduleRef.createNestApplication()
        await app.init()
    })

    it('/GET', () => {
        return request(app.getHttpServer())
            .get('/media')
            .expect(200)
            .expect({
                data: mediumService.findAll()
            })
    })
})
