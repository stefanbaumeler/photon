import MediaService from '../../services/media'
import { predefinedMediumUUIDs, predefinedUserUUIDs } from '../helpers/ids'
import { fileToMedium } from '../../helpers/exif'
import fs from 'fs'
import path from 'path'
import { getEnv } from '../../../env'
import { TMedium } from '@photon/schema'
import { extension } from 'mime-types'

const env = getEnv()

export default async (truncateOnly = false) => {
    const service = new MediaService()

    await service.truncate()

    if (truncateOnly) {
        return
    }

    const predefinedGeneratedTags = [
        'Hut, Nature, Outdoors, Countryside, Building, Rural, Architecture, Shelter, Housing, Shack',
        'Scenery, Nature, Outdoors, Rubble, Gravel, Road, Rock, Wilderness, Landscape, Person, Slope, Mountain Range, Mountain',
        'Scenery, Outdoors, Nature, Boat, Vehicle, Transportation, Railing, Handrail, Bridge, Summer, Water, Bird, Animal',
        'Grassland, Nature, Outdoors, Field, Meadow, Countryside, Rural, Plateau, Pasture, Farm, Grass, Plant, Ground, Scenery',
        'Reservoir, Outdoors, Nature, Water, Promontory, Scenery, Sea, Land',
        'Shelter, Outdoors, Building, Architecture, Hut, Nature, Countryside, Rural, Scenery, Car, Vehicle, Transportation, Pickup Truck, Truck, Person',
        'Scenery, Outdoors, Nature, Promontory, Water, Beach, Shoreline, Sea, Coast'
    ]

    for (let i = 0; i < 7; i++) {
        const filename = predefinedMediumUUIDs[i]
        const fixturePath = path.join(__dirname, '../', `fixtures/image-${i}.jpg`)
        const fullPath = path.join(__dirname, '../../../', env.API_UPLOADS_DIR, filename)

        if (!fs.existsSync('uploads')) {
            fs.mkdirSync('uploads')
        }

        fs.copyFileSync(fixturePath, fullPath)

        const medium = await fileToMedium({
            filePath: fullPath,
            fileName: filename,
            originalName: `Test Image ${i}.jpg`,
            user: predefinedUserUUIDs[0],
            type: 'image/jpeg'
        })

        await service.createOne({
            ...medium,
            generatedTags: predefinedGeneratedTags[i].split(', '),
            dateCreated: new Date('2022-11-11 00:00:00'),
            dateModified: new Date('2022-11-11 00:00:00'),
            id: filename,
            owner: {
                id: predefinedUserUUIDs[0]
            },
            uploader: {
                id: predefinedUserUUIDs[0]
            },
            favoredBy: i < 3 ? [{
                id: predefinedUserUUIDs[0]
            }] : []
        })
    }
}
